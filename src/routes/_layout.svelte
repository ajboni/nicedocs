<script>
  //   import { docs, flatDocs } from "./_docs";
  import { docs } from "../store";
  import { get } from "svelte/store";

  //temps
  //   let docs = [];
  let flatDocs = [];

  import Sidebar from "./_sidebar.svelte";
  import Content from "./_content.svelte";
  import Nav from "./_nav.svelte";
  import Footer from "./_footer.svelte";
</script>

<style>
  .page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>

<div class="page-container">
  <Nav />
  <main>
    <div class="container">
      <div class="row row-reverse">

        <div class="col col-lg-9">
          <div class="row">
            <div class="form-control col col-md-6 display-lg-down">
              <Sidebar docs={get(docs)} isMobile />
            </div>
          </div>
          <Content>
            <slot />
          </Content>
        </div>
        <div class="col col-lg-3 display-lg-up">
          <Sidebar docs={get(docs)} />
        </div>

      </div>
    </div>
  </main>
  <Footer />
</div>
