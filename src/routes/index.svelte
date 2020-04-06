<script context="module">
  import config from "../config.yaml";
  import { docs, currentLanguage, getLanguage } from "../store";
  import { get } from "svelte/store";

  export async function preload({ host, path, params, query }) {
    currentLanguage.set(getLanguage("eng"));
    const res = await this.fetch(
      `index.json?lang=${JSON.stringify(getLanguage("eng"))}`
    );
    const json = await res.json();

    if (res.status === 200) {
      docs.set(json);
    } else {
      this.error(res.status, data.message);
    }

    // Set the store value
    //  console.log(params.lang);
    //  currentLanguage.set(getLanguage("default"));
  }
</script>

<script>
  const index = get(docs).find(doc => doc.title === config.indexDocument);
</script>

<svelte:head>
  <title>{config.projectName}</title>
</svelte:head>

<div class="content">
  {@html index.content}
</div>
