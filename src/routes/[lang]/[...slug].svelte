<script context="module">
  import { getLanguage, currentLanguage, docs } from "../../store";
  import { get } from "svelte/store";
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte

    const language = getLanguage(params.lang);
    currentLanguage.set(language);

    // We need to fetch everything if the user is coming from URL.
    const resDocs = await this.fetch(`index.json`);
    let docsJSON = await resDocs.json();
    docs.set(docsJSON);

    const res = await this.fetch(`${params.lang}/${params.slug}.json`);
    let doc = await res.json();

    const data = {
      doc: doc
    };

    //  data.lang = params.lang;

    if (res.status === 200) {
      return { data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import config from "../../config.yaml";
  export let data;
  const doc = data.doc;
</script>

<style>
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
</style>

<svelte:head>
  <title>{doc.title} | {config.projectName}</title>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/prismjs@1.19.0/themes/prism.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.19.0/prism.min.js">

  </script>
</svelte:head>

<!-- <h1>{doc.title}</h1> -->

<div class="content">
  {@html doc.content}
</div>
