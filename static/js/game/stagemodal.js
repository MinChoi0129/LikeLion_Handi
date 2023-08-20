const stage_modal = document.querySelector(".stageModal");
const stage_num = stage_modal.querySelector(".ModalStageNum");
function openStageModal(stage) {
  stage_num.innerHTML = stage;
  stage_modal.classList.remove("hidden");
  setTimeout(() => {
    stage_modal.classList.add("hidden");
  }, 1000);
}
