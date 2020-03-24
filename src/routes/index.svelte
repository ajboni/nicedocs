<script context="module">
  import config from "../config.yaml";
  import { docs } from "../store";
  export async function preload({ host, path, params, query }) {
    // If language parameter, change accordingly
    let lang = query.lang ? query.lang : config.defaultLanguage;

    var searchParams = new URLSearchParams(query);
    const res = await this.fetch(`index.json?${searchParams}`);
    const json = await res.json();

    // Set the store value
    docs.set(json);
  }
</script>

<svelte:head>
  <title>{config.projectName}</title>
</svelte:head>

<h1>Landing Page.</h1>

<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
  in culpa qui officia deserunt mollit anim id est laborum. Offendit eleifend
  moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu,
  veri persius vituperata ei nec. Vivendum intellegat et qui, ei denique
  consequuntur vix.
</p>
<p>
  Scripta periculis ei eam, te pro movet reformidans. Offendit eleifend
  moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu,
  veri persius vituperata ei nec. Ei qui diceret voluptua luptatum, te dolorum
  detracto hendrerit sed, ad per offendit consetetur. Scripta periculis ei eam,
  te pro movet reformidans. Duis aute irure dolor in reprehenderit in voluptate
  velit esse cillum dolore eu fugiat nulla pariatur. Pri posse graeco
  definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te.
  Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis
  cotidieque quo cu, veri persius vituperata ei nec. Quot populo ad qui.
</p>
