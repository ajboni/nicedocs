<script context="module">
  import { getLanguage, currentLanguage, docs, doc } from "../../store";
  import { get } from "svelte/store";
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte

    const language = getLanguage(params.lang);
    currentLanguage.set(language);

    // We need to fetch everything if the user is coming from URL.
    // TODO: Only fetch sidebar and current language.
    const resDocs = await this.fetch(`index.json`);
    let docsJSON = await resDocs.json();
    docs.set(docsJSON);

    // Set up the current doc in the store.
    // TODO: Why If I return the doc to the component instead of going to the store
    // it force a rerender and loose store state (current language and sidebar)...
    const res = await this.fetch(`${params.lang}/index.json`);
    let docJSON = await res.json();

    if (res.status === 200) {
      doc.set(docJSON);
    } else {
      this.error(res.status, docJSON.message);
    }
  }
</script>

<script>
  import config from "../../config.yaml";
</script>

<svelte:head>
  <title>{config.projectName}</title>
</svelte:head>

<div class="content">
  {@html $doc.content}
</div>
