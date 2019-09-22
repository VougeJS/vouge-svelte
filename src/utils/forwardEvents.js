import { bubble, listen } from 'svelte/internal';

const Events = [
    'focus', 'blur', 'contextmenu',
    'keydown', 'keypress', 'keyup',
    'click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'wheel', 'auxclick', 'select',
    'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'scroll',
    'touchcancel', 'touchend', 'touchmove', 'touchstart',
    'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture', 'lostpointercapture', 'pointerlockerror', 'pointerlockchange',
    'copy', 'cut', 'paste',
    'fullscreenchange', 'fullscreenerror',
];

/**
 *  Example:
 *
 *  import { current_component } from 'svelte/internal';
 *
 *  let ForwardEventsOptions = {
 *      component: current_component, // <-- Required
 *
 *      exclude: [ 'click', 'dblclick' ], // <-- List of excluded events from forwarding
 *
 *      include: [ 'customevent' ] <-- List of events to include for forwarding.
 *
 *      only: [ 'focus', 'blur' ] <-- Only these events will be forwarded if appears in the list.
 *  };
 */
export function forwardEvents(node, { exclude, only, include } = {}) {
    let ForwardedEvents = [];
    const forwardEvent = e => bubble(parameters.component, e);

    let IncludedEvents = (parameters.include) ? [ ...parameters.include ] : [];
    let EventsToForward = [ ...Events, ...IncludedEvents ];

    // Exclude events from forwarding
    if (parameters.exclude) {
        EventsToForward = EventsToForward.filter(event => !parameters.exclude.includes(event));
    }

    // Forward only these events
    if (parameters.only) {
        EventsToForward = EventsToForward.filter(event => parameters.only.includes(event));
    }

    // Remove all duplicated entries
    EventsToForward = [ ...new Set(EventsToForward) ];

    EventsToForward.forEach(
        event => ForwardedEvents.push(
            listen(node, event, forwardEvent),
        ),
    );

    return {
        destroy() {
            ForwardedEvents.forEach(event => event());
        },
    };
}