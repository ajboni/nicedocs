<script>
  import Folder from "./_folder.svelte";
  import File from "./_file.svelte";
  export let docs;

  export let isMobile = false;
  //   console.log(docs);
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
  <label for="">Jump to:</label>
  <select onchange="window.location.href=this.value">
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
