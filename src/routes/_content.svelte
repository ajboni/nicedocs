<script>
  import Spinner from "./_spinner.svelte";
  import { stores } from "@sapper/app";
  const { preloading, page, session } = stores();
</script>

{#if $preloading}
  <Spinner caption="Loading posts..." />
{:else}
  <section>
    <slot />
  </section>
{/if}
