<script>
    import { forwardEvents } from '../../utils/forwardEvents';
    import { current_component } from 'svelte/internal';

    let ForwardEventsOptions = {
        component: current_component,
    };

    /**
     * @type { ('primary', 'secondary', 'success') }
     */
    export let variant;

    $: classNames = (() => {
        let className = 'btn';

        if (variant) {
            className += ` ${ variant }`;
        }

        return className;
    })();
</script>

<style lang="scss">
    .btn {
        display: inline-flex;
        font-weight: 400;
        align-content: center;
        justify-content: center;
        text-align: center;
        user-select: none;
    }
</style>

<button class="{classNames}" use:forwardEvents="{{...ForwardEventsOptions}}">
    <slot></slot>
</button>