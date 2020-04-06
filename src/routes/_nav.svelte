<script>
  import config from "../config.yaml";
  import { get } from "svelte/store";
  import { goto } from "@sapper/app";
  import { getLanguage, currentLanguage } from "../store.js";
  let showMobileMenu = false;
  let showLanguageMenu = false;

  function toggleMenu(e) {
    //  console.log(e);
    if (!showMobileMenu) {
      if (e.target.closest(".mobile-menu-toggle") !== null) {
        showMobileMenu = true;
      }
    } else {
      showMobileMenu = false;
    }

    if (!showLanguageMenu) {
      if (e.target.closest("#header-language-menu") !== null) {
        showLanguageMenu = true;
      }
    } else {
      showLanguageMenu = false;
    }
  }

  function changeLanguage(lang) {
    goto(lang.id).then(() => location.reload());
  }

  let currentLanguageCaption = get(currentLanguage).capti;
</script>

<style>
  .mobile-menu {
    position: absolute;
    top: 15px;
    right: 30px;
    z-index: 10;
  }

  .nav-logo a {
    display: flex;
    margin-right: 1rem;
    font-size: 1.8rem;
  }

  .nav-logo img {
    margin-right: 1rem;
  }
</style>

<svelte:body on:click={toggleMenu} />

<nav>
  <div class="nav-container" }>
    <div class="nav-logo">
      <a href="/">
        <img src={config.projectLogo} alt="nicedocs-logo" />
        <span>{config.projectName}</span>
      </a>
    </div>

    <ul class="nav-links" />

    <ul class="nav-links">

      {#each config.navigation as nav}
        <li>

          <a href={nav.url} target="_blank">
            <span class={nav.icon} style="margin-right: .5rem;" />
            {nav.caption}
          </a>
        </li>
      {/each}

      <li class="nav-dropdown-container">
        <button
          id="header-language-menu"
          type="button"
          class="nav-dropdown-menu-label"
          aria-haspopup="true"
          aria-owns="language-menu"
          aria-label="Current language is English. Choose your preferred
          language.">
          <span class="fa fa-language" style="margin-right: .5rem;" />
          <!-- {$currentLanguage.caption} &nbsp; -->
          {currentLanguageCaption} &nbsp;
          <span class="dropdown-arrow-down" aria-hidden="true">▼</span>
        </button>

        {#if showLanguageMenu}
          <!-- content here -->
          <ul
            id="language-menu"
            class="nav-dropdown-menu-items right"
            role="menu">
            {#each config.availableLanguages as lang}
              <li class="nav-menuitem">
                <!-- <a href={lang.id}>{lang.caption}</a> -->
                <div
                  style={'cursor:pointer'}
                  on:click={() => changeLanguage(lang)}>
                  {lang.caption}
                </div>
              </li>
            {/each}
          </ul>
        {/if}

      </li>
    </ul>
    <div class="mobile-menu-toggle" />
    {#if showMobileMenu}
      <ul class="mobile-menu menu">
        {#each config.navigation as nav}
          <li>
            <a href={nav.url} target="_blank">{nav.caption}</a>

          </li>
        {/each}

        {#each config.availableLanguages as lang}
          <li>
            <a href="#" on:click={changeLanguage(lang)} title="Catalan">
              {lang.caption}
            </a>
          </li>
        {/each}

      </ul>
    {/if}

  </div>
</nav>
