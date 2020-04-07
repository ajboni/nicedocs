<script>
  // 	This file only exists for the export process, it crawls every language folder and make a link to it
  //  in order to include it on the export.

  import config from "../../config.yaml";
  import { get as g } from "svelte/store";
  import { getLanguage, docs, docsMap } from "../../store.js";

  import { LoadDocs } from "../[lang]/_docs.js";
  const doc = LoadDocs();
  let slugs = [];

  for (const [key, value] of g(docsMap).entries()) {
    slugs.push(value.slug);
  }
</script>

{#each slugs as slug}
  <a href={slug}>{slug}</a>
{/each}
