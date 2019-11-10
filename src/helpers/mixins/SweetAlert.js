export const SweetAlert = {
  methods: {
    popUp(
      title = this.$t("message.warning"),
      type = "warning",
      singleButton = false
    ) {
      const swal = this.$swal.fire({
        title,
        type,
        showCloseButton: false,

        showCancelButton: !singleButton,
        showConfirmButton: true,
        confirmButtonText: `${this.$t("button.yes")}`,
        cancelButtonText: `${this.$t("button.cancel")}`
      });
      return swal;
    }
  }
};
