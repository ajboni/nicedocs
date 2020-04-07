<script context="module">
  import config from "../config.yaml";
  import { docs, getLanguage } from "../store";
  import { get } from "svelte/store";
  export async function preload({ host, path, params, query }) {
    let res;
    let json;
    let defaultLanguageDocs;

    //  const all = await this.fetch(`./docs/index.json`);
    //  const alljson = await res.json();

    // On this file, we will fetch every doc for every language.
    // The reason is because sapper export needs it to eventually build the api  and copy the docs.
    // TODO: It might be worth exploring --entry option for export and do this in another (non reachable page)

    res = await this.fetch(`index.json`);
    json = await res.json();

    //  for (const lang of config.availableLanguages) {
    //    console.log(lang);
    //    res = await this.fetch(`index.json?lang=${JSON.stringify(lang)}`);
    //    json = await res.json();

    //    // Once everything is crawled, set whatever language is default on the settings.
    //    // if (lang.id === config.defaultLanguage) {
    //    docs.set(json);
    //    defaultLanguageDocs = json;
    //    // }
    //  }

    if (res.status === 200) {
      docs.set(json);
    } else {
      this.error(res.status, json.message);
    }
  }
</script>

<script>
  const index = get(docs).eng.find(doc => doc.title === config.indexDocument);
</script>

<svelte:head>
  <title>{config.projectName}</title>
</svelte:head>

<div class="content">
  {@html index.content}
</div>
