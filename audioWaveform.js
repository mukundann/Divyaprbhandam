/**
 * audioWaveform.js — lightweight waveform decode + canvas renderer for Splitter.
 * Decode once via Web Audio API; draw overview + per-segment trim bars.
 */
(function () {
    'use strict';

    const PRECISION = 2;
    const SEGMENT_PALETTE = [
        '#4a90d9', '#50b86c', '#e8a838', '#9b59b6', '#e74c3c',
        '#1abc9c', '#f39c12', '#3498db', '#2ecc71', '#e67e22'
    ];
    const KEEP_FILL = 'rgba(40, 167, 69, 0.35)';
    const KEEP_STROKE = '#28a745';
    const GAP_FILL = 'rgba(239, 83, 80, 0.45)';
    const PLAYHEAD_COLOR = '#d32f2f';

    let peaks = null;
    let peakSampleRate = 0;
    let duration = 0;
    let audioContext = null;
    let decodePromise = null;
    let currentSrc = null;
    let rawPeaks = null;

    let overviewMount = null;
    const segmentBars = new Map();
    let playheadTime = 0;
    let activeSegmentIndex = -1;

    function roundTime(t) {
        return parseFloat(Number(t).toFixed(PRECISION));
    }

    function getAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    }

    function computePeaks(buffer, samplesPerPeak) {
        const channel = buffer.getChannelData(0);
        const len = channel.length;
        const count = Math.max(1, Math.ceil(len / samplesPerPeak));
        const mins = new Float32Array(count);
        const maxs = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            const start = i * samplesPerPeak;
            const end = Math.min(start + samplesPerPeak, len);
            let min = 1;
            let max = -1;
            for (let j = start; j < end; j++) {
                const v = channel[j];
                if (v < min) min = v;
                if (v > max) max = v;
            }
            mins[i] = min;
            maxs[i] = max;
        }
        return { mins, maxs, count };
    }

    async function decode(src) {
        if (!src) return false;
        if (src === currentSrc && peaks) return true;
        if (decodePromise && src === currentSrc) return decodePromise;

        currentSrc = src;
        decodePromise = (async () => {
            try {
                const ctx = getAudioContext();
                const response = await fetch(src);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
                duration = buffer.duration;
                peakSampleRate = buffer.sampleRate;
                rawPeaks = computePeaks(buffer, Math.max(64, Math.floor(buffer.length / 2000)));
                peaks = rawPeaks;
                if (overviewMount) redrawOverview();
                segmentBars.forEach((bar) => bar.redraw());
                return true;
            } catch (err) {
                console.warn('[AudioWaveform] decode failed:', err);
                peaks = null;
                rawPeaks = null;
                duration = 0;
                return false;
            } finally {
                decodePromise = null;
            }
        })();
        return decodePromise;
    }

    function resamplePeaksForWidth(width) {
        if (!rawPeaks || width < 1) return null;
        const target = Math.max(1, Math.floor(width));
        if (rawPeaks.count === target) return rawPeaks;
        const { mins, maxs, count } = rawPeaks;
        const outMins = new Float32Array(target);
        const outMaxs = new Float32Array(target);
        for (let i = 0; i < target; i++) {
            const srcStart = Math.floor((i / target) * count);
            const srcEnd = Math.floor(((i + 1) / target) * count);
            let min = 1;
            let max = -1;
            for (let j = srcStart; j < Math.max(srcStart + 1, srcEnd); j++) {
                if (j >= count) break;
                if (mins[j] < min) min = mins[j];
                if (maxs[j] > max) max = maxs[j];
            }
            outMins[i] = min;
            outMaxs[i] = max;
        }
        return { mins: outMins, maxs: outMaxs, count: target };
    }

    function timeToX(time, viewStart, viewEnd, width) {
        const span = viewEnd - viewStart;
        if (span <= 0) return 0;
        return ((time - viewStart) / span) * width;
    }

    function xToTime(x, viewStart, viewEnd, width) {
        const span = viewEnd - viewStart;
        if (width <= 0) return viewStart;
        return viewStart + (x / width) * span;
    }

    function drawPeaksForTimeRange(ctx, pk, viewStart, viewEnd, x, y, w, h, color) {
        if (!pk || duration <= 0 || viewEnd <= viewStart) return;
        const mid = y + h / 2;
        const half = h / 2 - 1;
        ctx.fillStyle = color;
        const cols = Math.max(1, Math.floor(w));
        for (let i = 0; i < cols; i++) {
            const t0 = viewStart + (i / cols) * (viewEnd - viewStart);
            const t1 = viewStart + ((i + 1) / cols) * (viewEnd - viewStart);
            const idx0 = Math.max(0, Math.floor((t0 / duration) * pk.count));
            const idx1 = Math.min(pk.count, Math.ceil((t1 / duration) * pk.count));
            let min = 1;
            let max = -1;
            for (let j = idx0; j < idx1; j++) {
                if (pk.mins[j] < min) min = pk.mins[j];
                if (pk.maxs[j] > max) max = pk.maxs[j];
            }
            const px = x + (i / cols) * w;
            const barW = Math.max(1, w / cols);
            const top = mid - max * half;
            const bot = mid - min * half;
            ctx.fillRect(px, top, barW, Math.max(1, bot - top));
        }
    }

    function drawWaveformPeaks(ctx, pk, x, y, w, h, color) {
        drawPeaksForTimeRange(ctx, pk, 0, duration || 1, x, y, w, h, color);
    }

    function findSilenceValley(time, radiusSec) {
        if (!rawPeaks || duration <= 0) return roundTime(time);
        radiusSec = radiusSec || 0.25;
        const t0 = Math.max(0, time - radiusSec);
        const t1 = Math.min(duration, time + radiusSec);
        const startIdx = Math.floor((t0 / duration) * rawPeaks.count);
        const endIdx = Math.ceil((t1 / duration) * rawPeaks.count);
        let bestIdx = startIdx;
        let bestAmp = Infinity;
        for (let i = startIdx; i < endIdx; i++) {
            const amp = Math.max(Math.abs(rawPeaks.mins[i]), Math.abs(rawPeaks.maxs[i]));
            if (amp < bestAmp) {
                bestAmp = amp;
                bestIdx = i;
            }
        }
        const valleyTime = (bestIdx / rawPeaks.count) * duration;
        return roundTime(valleyTime);
    }

    function drawOverview(canvas, markers, issues, playhead, activeIdx) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const w = Math.max(1, rect.width);
        const h = Math.max(1, rect.height);
        if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
        }
        const ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        const viewEnd = duration || (markers.length ? markers[markers.length - 1].end : 1);
        const pk = resamplePeaksForWidth(w);
        drawWaveformPeaks(ctx, pk, 0, 0, w, h, '#b0bec5');

        if (markers && markers.length) {
            for (let i = 0; i < markers.length; i++) {
                const m = markers[i];
                const x0 = timeToX(m.start, 0, viewEnd, w);
                const x1 = timeToX(m.end, 0, viewEnd, w);
                const color = SEGMENT_PALETTE[i % SEGMENT_PALETTE.length];
                ctx.fillStyle = i === activeIdx ? color + '99' : color + '55';
                ctx.fillRect(x0, 0, Math.max(1, x1 - x0), h);
            }
            if (issues) {
                issues.forEach((issue) => {
                    if (!issue.types.includes('gap')) return;
                    const prev = markers[issue.index - 1];
                    const curr = markers[issue.index];
                    if (!prev || !curr) return;
                    const gx0 = timeToX(prev.end, 0, viewEnd, w);
                    const gx1 = timeToX(curr.start, 0, viewEnd, w);
                    ctx.fillStyle = GAP_FILL;
                    ctx.fillRect(gx0, 0, Math.max(1, gx1 - gx0), h);
                });
            }
        }

        if (playhead > 0 && viewEnd > 0) {
            const px = timeToX(playhead, 0, viewEnd, w);
            ctx.strokeStyle = PLAYHEAD_COLOR;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px, 0);
            ctx.lineTo(px, h);
            ctx.stroke();
        }
    }

    function drawSegmentBar(canvas, segmentIndex, markers, playhead, expanded) {
        const m = markers[segmentIndex];
        if (!m) return;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const w = Math.max(1, rect.width);
        const h = Math.max(1, rect.height);
        if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
        }
        const ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        const pad = expanded ? 0.5 : 0.15;
        const segLen = m.end - m.start;
        const margin = Math.max(0.05, segLen * pad);
        const viewStart = Math.max(0, m.start - margin);
        const viewEnd = Math.min(duration || m.end + margin, m.end + margin);
        const pk = rawPeaks;
        drawPeaksForTimeRange(ctx, pk, viewStart, viewEnd, 0, 0, w, h, '#cfd8dc');

        const x0 = timeToX(m.start, viewStart, viewEnd, w);
        const x1 = timeToX(m.end, viewStart, viewEnd, w);
        ctx.fillStyle = KEEP_FILL;
        ctx.fillRect(x0, 0, Math.max(2, x1 - x0), h);
        ctx.strokeStyle = KEEP_STROKE;
        ctx.lineWidth = 2;
        ctx.strokeRect(x0, 0.5, Math.max(2, x1 - x0), h - 1);

        const handleW = expanded ? 10 : 6;
        ctx.fillStyle = KEEP_STROKE;
        ctx.fillRect(x0 - handleW / 2, 0, handleW, h);
        ctx.fillRect(x1 - handleW / 2, 0, handleW, h);

        if (playhead >= viewStart && playhead <= viewEnd) {
            const px = timeToX(playhead, viewStart, viewEnd, w);
            ctx.strokeStyle = PLAYHEAD_COLOR;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px, 0);
            ctx.lineTo(px, h);
            ctx.stroke();
        }

        return { viewStart, viewEnd, x0, x1, handleW };
    }

    function mountOverview(container, callbacks) {
        container.innerHTML = '';
        const wrap = document.createElement('div');
        wrap.className = 'wf-overview-wrap';
        const label = document.createElement('div');
        label.className = 'wf-label';
        label.textContent = 'Track overview';
        const canvas = document.createElement('canvas');
        canvas.className = 'wf-overview-canvas';
        wrap.appendChild(label);
        wrap.appendChild(canvas);
        container.appendChild(wrap);

        let dragging = null;

        function hitTest(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const w = rect.width;
            const viewEnd = duration || 1;
            return { x, time: roundTime(xToTime(x, 0, viewEnd, w)) };
        }

        canvas.addEventListener('mousedown', (e) => {
            if (!callbacks.onSeek) return;
            const hit = hitTest(e);
            dragging = 'seek';
            callbacks.onSeek(hit.time);
        });
        canvas.addEventListener('mousemove', (e) => {
            if (dragging !== 'seek') return;
            callbacks.onSeek(hitTest(e).time);
        });
        window.addEventListener('mouseup', () => { dragging = null; });

        canvas.addEventListener('click', (e) => {
            if (!callbacks.onSeek) return;
            callbacks.onSeek(hitTest(e).time);
            if (callbacks.onSegmentClick && callbacks.getMarkers) {
                const t = hitTest(e).time;
                const markers = callbacks.getMarkers();
                const idx = markers.findIndex((mk) => t >= mk.start && t < mk.end);
                if (idx >= 0) callbacks.onSegmentClick(idx);
            }
        });

        overviewMount = { canvas, callbacks };
        redrawOverview();
    }

    function redrawOverview() {
        if (!overviewMount) return;
        const { canvas, callbacks } = overviewMount;
        const markers = callbacks.getMarkers ? callbacks.getMarkers() : [];
        const issues = callbacks.getIssues ? callbacks.getIssues() : [];
        drawOverview(canvas, markers, issues, playheadTime, activeSegmentIndex);
    }

    function createSegmentBar(canvas, segmentIndex, callbacks, expanded) {
        const state = { segmentIndex, callbacks, expanded: !!expanded, drag: null };

        function redraw() {
            const markers = callbacks.getMarkers ? callbacks.getMarkers() : [];
            const layout = drawSegmentBar(canvas, segmentIndex, markers, playheadTime, state.expanded);
            state.layout = layout;
        }

        function localHit(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const w = rect.width;
            if (!state.layout) return { zone: 'none' };
            const { viewStart, viewEnd, x0, x1, handleW } = state.layout;
            const t = roundTime(xToTime(x, viewStart, viewEnd, w));
            if (Math.abs(x - x0) <= handleW) return { zone: 'start', time: t };
            if (Math.abs(x - x1) <= handleW) return { zone: 'end', time: t };
            if (x >= x0 && x <= x1) return { zone: 'body', time: t };
            return { zone: 'seek', time: t };
        }

        canvas.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            const hit = localHit(e);
            if (hit.zone === 'start' || hit.zone === 'end') {
                state.drag = hit.zone;
                if (callbacks.onDragStart) callbacks.onDragStart(segmentIndex, hit.zone);
            } else if (hit.zone === 'seek' || hit.zone === 'body') {
                state.drag = 'seek';
                if (callbacks.onSeek) callbacks.onSeek(hit.time);
            }
        });
        canvas.addEventListener('mousemove', (e) => {
            if (!state.drag) return;
            const hit = localHit(e);
            if (state.drag === 'start' && callbacks.onBoundaryChange) {
                callbacks.onBoundaryChange(segmentIndex, 'start', hit.time);
            } else if (state.drag === 'end' && callbacks.onBoundaryChange) {
                callbacks.onBoundaryChange(segmentIndex, 'end', hit.time);
            } else if (state.drag === 'seek' && callbacks.onSeek) {
                callbacks.onSeek(hit.time);
            }
            redraw();
        });
        window.addEventListener('mouseup', () => {
            if (state.drag && callbacks.onDragEnd) callbacks.onDragEnd(segmentIndex);
            state.drag = null;
        });
        canvas.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            if (callbacks.onToggleExpand) callbacks.onToggleExpand(segmentIndex);
        });

        const bar = { canvas, segmentIndex, redraw, setExpanded(exp) { state.expanded = exp; redraw(); }, destroy() {} };
        segmentBars.set(segmentIndex, bar);
        redraw();
        return bar;
    }

    function setPlayhead(t) {
        playheadTime = t;
        redrawOverview();
        segmentBars.forEach((bar) => bar.redraw());
    }

    function setActiveSegment(idx) {
        activeSegmentIndex = idx;
        redrawOverview();
    }

    function refreshAll() {
        redrawOverview();
        segmentBars.forEach((bar) => bar.redraw());
    }

    function clearSegmentBars() {
        segmentBars.clear();
    }

    function destroyOverview() {
        overviewMount = null;
    }

    function showUnavailable(container, message) {
        container.innerHTML = '<div class="wf-unavailable">' + message + '</div>';
    }

    window.AudioWaveform = {
        PRECISION,
        roundTime,
        decode,
        isReady: () => !!peaks,
        getDuration: () => duration,
        findSilenceValley,
        mountOverview,
        createSegmentBar,
        setPlayhead,
        setActiveSegment,
        refreshAll,
        clearSegmentBars,
        destroyOverview,
        showUnavailable,
        redrawOverview
    };
})();
