<script>
  export let doc;
  export let isMobile = false;
  export let level = 0;
  let levelString = "";
  for (let index = 0; index < level; index++) {
    levelString += " ";
  }
</script>

{#if !isMobile}
  <a href={`${doc.slug}`}>{doc.title}</a>
{:else}
  <option value={doc.slug}>{levelString + doc.title}</option>
{/if}
