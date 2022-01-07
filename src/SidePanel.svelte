<script>

    import { MovePosition } from "./ctransitions.js";

    export let myId;

    function PanelAnim(node, { delay = 0 , duration = 200 }) {
        return {
            delay,
			duration,
			css: t => {

				return `
                position: absolute;
                right: ${-1*(30-30*t)}vw; `
                
			}
		};
    }

</script>

<div class={"side-panel"} id={myId} in:MovePosition="{{
    fx:-30,
    tx:0,
    left:false,
    unit:"vw",
    delay:250}}"

    out:MovePosition="{{
        fx:-30,
        tx:0,
        left:false,
        unit:"vw",
    }}">
    <slot />
</div>

<style>
    .side-panel {
        width: 100%;
        height: 100%;
        padding: 0.83em;
        box-sizing: border-box;
        position: absolute;
        right: 0vw;
        display: flex;
        flex-direction: column;
    }

    :global(.side-panel h2){
        margin-top: 0px;
    }

        /* scrollbar style hidden from https://www.w3schools.com/howto/howto_css_hide_scrollbars.asp*/
        #session::-webkit-scrollbar {
      display: none;
    }
    
    #session {
      -ms-overflow-style: none;
      scrollbar-width: none;
      overflow: auto;
    }

</style>
