// bagAnimation.js
// Owns the bag's drop-in / tilt / pour timeline and its own drawing.
// Knows nothing about Matter.js — the physics side only ever calls
// getSpoutPosition() to know where to originate beans.
//
// Shape/finish is modeled on a standard kraft stand-up pouch: a wide
// folded top, gusseted sides, a flat-fold bottom, and a soft directional
// gradient instead of a flat fill so it reads as paper, not a cutout.
// Brand text is left as placeholders — swap the `label` fields for your
// own copy rather than this file guessing at a real brand's wording.

const MOUTH_OFFSET = { x: 28, y: -74 }; // peel-open corner at the top of the fold, in local space

// bag geometry, local (unrotated) coordinates, origin at the rotation pivot
const FOLD_TOP_HW = 32;      // half-width at the very top of the folded flap
const FOLD_BOTTOM_HW = 38;   // half-width where the fold meets the body (== body's top half-width)
const BODY_BOTTOM_HW = 44;   // half-width at the base — slightly wider, like a flat-bottom pouch
const TOP_Y = -80;
const FOLD_CREASE_Y = -55;   // seam between the folded flap and the main body
const BOTTOM_Y = 75;

export function createBag({
    x = 400,
    restY = 150,
    tiltAngle = -1.1,
    label = {},
} = {}) {
    const {
        brand = 'YOUR BRAND',
        tagline = 'PREMIUM BLEND',
        detail = 'SINGLE ORIGIN',
        origin = 'ROASTED FRESH',
    } = label;

    const bag = {
        x,
        y: -80,            // starts off-screen above the frame
        rotation: 0,
        phase: 'dropping',  // 'dropping' -> 'tilting' -> 'pouring'
        onPourStart: null,  // set by the caller; fires once, the moment tilting completes

        update() {
            if (bag.phase === 'dropping') {
                bag.y += (restY - bag.y) * 0.08;
                if (Math.abs(restY - bag.y) < 1) {
                    bag.y = restY;
                    bag.phase = 'tilting';
                }
            } else if (bag.phase === 'tilting') {
                bag.rotation += (tiltAngle - bag.rotation) * 0.06;
                if (Math.abs(tiltAngle - bag.rotation) < 0.02) {
                    bag.rotation = tiltAngle;
                    bag.phase = 'pouring';
                    if (bag.onPourStart) bag.onPourStart();
                }
            }
            // 'pouring' holds position — nothing left to ease toward
        },

        getSpoutPosition() {
            const cos = Math.cos(bag.rotation);
            const sin = Math.sin(bag.rotation);
            return {
                x: bag.x + MOUTH_OFFSET.x * cos - MOUTH_OFFSET.y * sin,
                y: bag.y + MOUTH_OFFSET.x * sin + MOUTH_OFFSET.y * cos,
            };
        },

        draw(ctx) {
            ctx.save();
            ctx.translate(bag.x, bag.y);
            ctx.rotate(bag.rotation);

            // shared left-to-right gradient — a single light source across the whole bag,
            // rather than a flat fill, is most of what sells the "paper" look
            const kraft = ctx.createLinearGradient(-BODY_BOTTOM_HW, 0, BODY_BOTTOM_HW, 0);
            kraft.addColorStop(0, '#d8bd8c');
            kraft.addColorStop(0.45, '#c7a874');
            kraft.addColorStop(1, '#93764a');

            const outline = '#5c4726';

            // main body — nearly rectangular, slightly wider at the base (flat-bottom pouch)
            ctx.beginPath();
            ctx.moveTo(-FOLD_BOTTOM_HW, FOLD_CREASE_Y);
            ctx.lineTo(FOLD_BOTTOM_HW, FOLD_CREASE_Y);
            ctx.lineTo(BODY_BOTTOM_HW, BOTTOM_Y);
            ctx.lineTo(-BODY_BOTTOM_HW, BOTTOM_Y);
            ctx.closePath();
            ctx.fillStyle = kraft;
            ctx.fill();
            ctx.strokeStyle = outline;
            ctx.lineWidth = 2;
            ctx.stroke();

            // folded top flap
            ctx.beginPath();
            ctx.moveTo(-FOLD_TOP_HW, TOP_Y);
            ctx.lineTo(FOLD_TOP_HW, TOP_Y);
            ctx.lineTo(FOLD_BOTTOM_HW, FOLD_CREASE_Y);
            ctx.lineTo(-FOLD_BOTTOM_HW, FOLD_CREASE_Y);
            ctx.closePath();
            ctx.fillStyle = kraft;
            ctx.fill();
            ctx.stroke();

            // crease lines inside the fold, suggesting the paper doubling over on itself
            ctx.strokeStyle = 'rgba(60, 40, 20, 0.35)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-26, -72); ctx.lineTo(26, -72);
            ctx.moveTo(-29, -64); ctx.lineTo(29, -64);
            ctx.stroke();

            // side gusset seams, inset from the body's outer edge
            ctx.beginPath();
            ctx.moveTo(-24, FOLD_CREASE_Y); ctx.lineTo(-24, BOTTOM_Y);
            ctx.moveTo(24, FOLD_CREASE_Y); ctx.lineTo(24, BOTTOM_Y);
            ctx.stroke();

            // flat-bottom fold corners
            ctx.beginPath();
            ctx.moveTo(-BODY_BOTTOM_HW, 61); ctx.lineTo(-30, BOTTOM_Y);
            ctx.moveTo(BODY_BOTTOM_HW, 61); ctx.lineTo(30, BOTTOM_Y);
            ctx.stroke();

            // peel-open corner — the gap MOUTH_OFFSET points to; this is a functional
            // addition for the pour, not something the sealed reference bag shows
            ctx.beginPath();
            ctx.moveTo(FOLD_TOP_HW - 8, TOP_Y);
            ctx.lineTo(FOLD_TOP_HW, TOP_Y);
            ctx.lineTo(FOLD_TOP_HW - 3, TOP_Y + 12);
            ctx.closePath();
            ctx.fillStyle = '#3b2417';
            ctx.fill();

            // embossed circular emblem with simple flanking bean flourishes
            ctx.beginPath();
            ctx.arc(0, -30, 14, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(60, 40, 20, 0.5)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.font = 'bold 14px Georgia, serif';
            ctx.fillStyle = 'rgba(60, 40, 20, 0.55)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(brand.charAt(0), 0, -29);

            [-1, 1].forEach((side) => {
                ctx.save();
                ctx.translate(side * 20, -30);
                ctx.rotate(side * 0.4);
                ctx.beginPath();
                ctx.ellipse(0, 0, 4, 8, 0, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(60, 40, 20, 0.4)';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.restore();
            });

            // label copy — swap these via the `label` option rather than editing here
            ctx.fillStyle = '#8a6a2f';
            ctx.font = 'bold 12px Georgia, serif';
            ctx.fillText(brand, 0, 2);

            ctx.fillStyle = '#241708';
            ctx.font = '8px Georgia, serif';
            ctx.fillText(tagline, 0, 16);
            ctx.font = '7px Georgia, serif';
            ctx.fillText(detail, 0, 27);

            ctx.fillStyle = '#3a2a15';
            ctx.fillText(origin, 0, 60);

            ctx.restore();
        },
    };

    return bag;
}