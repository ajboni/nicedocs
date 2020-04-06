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

</script>

<h1>saddsaadsdas {$currentLanguage.id}</h1>
