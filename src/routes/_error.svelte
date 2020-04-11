<script>
  import config from "../config.yaml";
  export let status;
  export let error;
  const dev = process.env.NODE_ENV === "development";
  let errorImg;
  if (status === "404") {
    errorImg = config.img404;
  } else errorImg = config.imgError;
</script>

<style>
  .error-container {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    row-gap: 1rem;
  }

  .error-container img {
    width: 60%;
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="error-container">
  <h1>{status}</h1>
  <p>{error.message}</p>
  <img src={errorImg} alt="404" />

</div>
{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
