<script>
  export let docs;
  import Folder from "./_folder.svelte";
  import File from "./_file.svelte";
</script>

<div class="sidebar sidebar-left">
  <ul class="sidebar-links">
    {#each docs as doc}
      <li>
        <!-- content here -->
        {#if doc.type === 'category'}
          <Folder {doc} isCategory />
        {:else if doc.type === 'folder'}
          <Folder {doc} />
        {:else}
          <File {doc} />
          <!-- FIle -->
        {/if}
      </li>
    {/each}

  </ul>

  <!-- <h3 class="sidebar-category">Components</h3>
  <ul class="sidebar-links">
    <li>
      <a href="#">Alerts</a>
    </li>
    <li>
      <a href="#">Breadcrumbs</a>
    </li>
    <li>
      <a class="active" href="#">Cards</a>
    </li>

  </ul> -->
</div>
