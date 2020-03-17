<script>
  import Folder from "./_folder.svelte";
  import File from "./_file.svelte";
  export let docs;
  let selected;
  export let isMobile = false;
  import { goto } from "@sapper/app";
  function jumpTo(e) {
    goto(selected);
  }
</script>

{#if !isMobile}
  <div class="sidebar sidebar-left">
    <ul class="sidebar-links">
      {#each docs as doc}
        <li>
          {#if doc.type === 'category'}
            <Folder {doc} isCategory />
          {:else if doc.type === 'folder'}
            <Folder {doc} />
          {:else}
            <File {doc} />
          {/if}
        </li>
      {/each}

    </ul>

  </div>
{:else}
  <label for="jumpToSelector">Jump to:</label>
  <select id="jumpToSelector" bind:value={selected} on:change={jumpTo}>
    {#each docs as doc}
      {#if doc.type === 'category'}
        <Folder {doc} isCategory isMobile />
      {:else if doc.type === 'folder'}
        <Folder {doc} isMobile />
      {:else}
        <File {doc} isMobile />
      {/if}
    {/each}

  </select>
{/if}
