<script context="module">
  import { docs, currentLanguage, getLanguage } from "../../store";
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte

    const language = getLanguage(params.lang);
    currentLanguage.set(language);

    const res = await this.fetch(
      `./index.json?lang=${JSON.stringify(language)}`
    );
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
  import config from "../../config.yaml";
  import { get } from "svelte/store";

  const index = get(docs).find(doc => doc.title === config.indexDocument);
</script>

<div class="content">
  {@html index.content}
</div>
