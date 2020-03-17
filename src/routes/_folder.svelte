<script>
  import File from "./_file.svelte";
  export let doc;
  export let isMobile = false;
  export let isCategory = false;
  export let level = 0;
  let levelString = "";
  for (let index = 0; index < level; index++) {
    levelString += " ";
  }

  export let state = "";
  function toggleState() {
    if (state === "") {
      state = "active";
    } else {
      state = "";
    }
  }
</script>

<style>
  div :global(body) {
    color: red;
  }
  .sidebar-category.active + .sidebar-links {
    display: block;
  }

  .sidebar-links {
    display: none;
  }

  .nested {
    margin: 8px 10px;
    padding: 2px 0px;
    font-size: 16px;
    font-weight: 800;
    color: #757575;
    border-bottom: 1px solid #e0e0e0;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 29 14" width="29"><path d="M9.4 3.6l5.1 6.9L19.5 3.6" fill="#bdbdbd"/></svg>')
      center right no-repeat;
  }

  .folder {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<!-- STANDARD -->
{#if !isMobile}
  {#if isCategory}
    <h3 class={'sidebar-category ' + state} on:click={toggleState}>
      {doc.title}
    </h3>
  {:else}
    <div
      class={'sidebar-category ' + state + ' nested'}
      on:click={toggleState}
      href="#">
      {#if state === 'active'}
        <i
          class="fa fa-minus-square"
          style="color:#b0b0b0; margin-right:6px;" />
      {:else}
        <i class="fa fa-plus-square" style="color:#b0b0b0; margin-right:6px;" />
      {/if}
      {doc.title}
    </div>
  {/if}
  <ul class="sidebar-links">
    {#each doc.children as subdoc}
      <li>
        {#if subdoc.type === 'folder'}
          <svelte:self doc={subdoc} />
        {:else}
          <File doc={subdoc} />
        {/if}
      </li>
    {/each}
  </ul>

  <!-- MOBILE SIDEBAR -->
{:else}
  <!-- <optgroup label={levelString + doc.title}> -->
  <option disabled>{levelString + doc.title}</option>
  {#each doc.children as subdoc}
    {#if subdoc.type === 'folder'}
      <svelte:self doc={subdoc} isMobile level={level + 2} />
    {:else}
      <File doc={subdoc} isMobile level={level + 2} />
    {/if}
  {/each}

  <!-- </optgroup> -->
{/if}
