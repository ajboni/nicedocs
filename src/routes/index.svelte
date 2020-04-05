<script context="module">
  import config from "../config.yaml";
  import { docs, currentLanguage } from "../store";
  import { get } from "svelte/store";

  export async function preload({ host, path, params, query }) {
    const res = await this.fetch(`index.json?lang=${get(currentLanguage)}`);
    const json = await res.json();

    if (res.status === 200) {
      docs.set(json);
    } else {
      this.error(res.status, data.message);
    }

    // Set the store value
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
