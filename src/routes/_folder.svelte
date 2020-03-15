<script>
  export let doc;
  export let isCategory = false;
  import File from "./_file.svelte";
</script>

{#if isCategory}
  <h3 class="sidebar-category">{doc.title}</h3>
  <!-- content here -->
{:else}
  <a class="sidebar-category" href="#">{doc.title}</a>
  <!-- else content here -->
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
