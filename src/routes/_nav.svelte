<script>
  import config from "../config.yaml";
  let showMobileMenu = false;

  function toggleMenu() {
    showMobileMenu = !showMobileMenu;
  }
</script>

<style>
  .mobile-menu {
    position: absolute;
    top: 15px;
    right: 30px;
    z-index: 10;
  }
</style>

<nav>
  <div class="nav-container">
    <div class="nav-logo">
      <a href="/">{config.projectName}</a>
    </div>
    <ul class="nav-links">
      {#each config.navigation as nav}
        <li>

          <a href={nav.url} target="_blank">
            <span class={nav.icon} style="margin-right: .5rem;" />
            {nav.caption}
          </a>
        </li>
      {/each}

    </ul>
    <div class="mobile-menu-toggle" on:click={toggleMenu} />

    {#if showMobileMenu}
      <ul class="mobile-menu menu" on:blur={toggleMenu}>
        {#each config.navigation as nav}
          <li>

            <a href={nav.url} target="_blank">{nav.caption}</a>
          </li>
        {/each}

      </ul>
    {/if}

  </div>
</nav>
