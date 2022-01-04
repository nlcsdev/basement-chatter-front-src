<script>
    import { sidebarActive, sidebtnActive, activePanel } from "./store.js";
    import { MovePosition } from "./ctransitions.js";
    import ProfilePanel from "./ProfilePanel.svelte";
    import SessionPanel from "./SessionPanel.svelte";
    import SettingPanel from "./SettingPanel.svelte";

    function ToggleSidebar() {
        sidebarActive.set(!$sidebarActive);
        if ($sidebarActive) {
            clearTimeout(timeoutID);
        }
    }

    function OpenSidebar() {
        sidebarActive.set(true);
        clearTimeout(timeoutID);
    }

    function SetActiveSidebar(target) {
        activePanel.set(target);
    }

    let hangingDuration = 5000;
    let timeoutID;

    function LeaveSidebarBtn() {
        if (!$sidebarActive) {
            timeoutID = setTimeout(() => {
                sidebtnActive.set(false);
            }, hangingDuration);
        }
    }

    SetActiveSidebar("profile");
</script>

<div
    id="sidebar"
    class={$sidebarActive ? "sidebar-active" : "sidebar-inactive"}
    in:MovePosition={{
        fx: -38,
        tx: -30,
        left: false,
        unit: "vw",
        duration: 400,
    }}
>
    <button
        on:click={() => {
            ToggleSidebar();
        }}
        on:mouseenter={() => {
            sidebtnActive.set(true);
            clearTimeout(timeoutID);
        }}
        on:mouseleave={() => LeaveSidebarBtn()}
        class="sidebar-btn general-btn"
    >
        <i class="material-icons">more_vert</i>
    </button>

    {#if $sidebarActive || $sidebtnActive}
        <button
            on:click={() => {
                OpenSidebar();
                SetActiveSidebar("profile");
            }}
            on:mouseenter={() => clearTimeout(timeoutID)}
            on:mouseleave={() => LeaveSidebarBtn()}
            transition:MovePosition|local="{{
                unit:"v",
                fy: 48.5,
                ty: 41.5,
                fx: -4,
                tx: -7
            }}"
            class="sidebar-btn profile-btn"
        >
            <i class="material-icons">person</i>
        </button>

        <button
            on:click={() => {
                OpenSidebar();
                SetActiveSidebar("session");
            }}
            on:mouseenter={() => clearTimeout(timeoutID)}
            on:mouseleave={() => LeaveSidebarBtn()}
            transition:MovePosition|local="{{
                unit:"v",
                fy: 48.5,
                ty: 48.5,
                fx: -4,
                tx: -8
            }}"
            class="sidebar-btn session-btn"
        >
            <i class="material-icons">chat_bubble</i>
        </button>

        <button
            on:click={() => {
                OpenSidebar();
                SetActiveSidebar("setting");
            }}
            on:mouseenter={() => clearTimeout(timeoutID)}
            on:mouseleave={() => LeaveSidebarBtn()}
            transition:MovePosition|local="{{
                unit:"v",
                fy: 48.5,
                ty: 55.5,
                fx: -4,
                tx: -7
            }}"
            class="sidebar-btn setting-btn"
        >
            <i class="material-icons">settings</i>
        </button>
    {/if}

    {#if $activePanel == "profile"}
        <ProfilePanel />
    {:else if $activePanel == "session"}
        <SessionPanel />
    {:else if $activePanel == "setting"}
        <SettingPanel />
    {/if}
</div>

<style>
    #sidebar {
        transition: 1s;
        height: 100vh;
        position: absolute;
        top: 0%;
        background-color: var(--black);
        width: 30vw;
    }

    .sidebar-inactive {
        right: -30vw;
    }

    .sidebar-active {
        right: 0vw;
    }

    .sidebar-btn {
        position: absolute;
        background-color: var(--darker);
        width: 3vh;
        height: 3vh;
        --center: calc(50vh - 1.5vh);
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .general-btn {
        left: -4vw;
        top: var(--center);
        z-index: 99;
    }
    .profile-btn {
        left: -7vw;
        top: 41.5vh;
    }
    .session-btn {
        left: -8vw;
        top: var(--center);
    }
    .setting-btn {
        left: -7vw;
        top: 55.5vh;
    }

    i {
        color: var(--white);
        font-size: 125%;
    }
</style>
