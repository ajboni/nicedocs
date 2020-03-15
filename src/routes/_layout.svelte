<script>
  import { docs } from "./_docs";
  import Sidebar from "./_sidebar.svelte";
  import Content from "./_content.svelte";
  import Nav from "./_nav.svelte";
</script>

<Nav />
<main>
  <div class="container">
    <div class="row row-reverse">
      <div class="col col-lg-9">
        <Content>
          <slot />
        </Content>
      </div>
      <div class="col col-lg-3 display-lg-up">
        <Sidebar {docs} />
      </div>

    </div>
  </div>
</main>
