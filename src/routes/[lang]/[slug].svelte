<script context="module">
  import { currentLanguage, getLanguage } from "../../store";
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte

    const language = getLanguage(params.lang);
    currentLanguage.set(language);
    console.log(get(currentLanguage));

    const res = await this.fetch(`${params.lang}/${params.slug}.json`);
    let data = await res.json();
    data.lang = params.lang;

    if (res.status === 200) {
      return { data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import config from "../../config.yaml";
  import { docs } from "../../store";
  import { get } from "svelte/store";
  export let data;
  docs.set(data.docs);
  currentLanguage.set(getLanguage(data.lang));
  get(currentLanguage);

  const doc = data.doc;
  // Fill up docs store, otherwise if user gets into the url directly, we wont get the sidebar.
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
