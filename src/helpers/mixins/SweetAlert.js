export const SweetAlert = {
  methods: {
    popUp(
      title = this.$t("field.message.warning"),
      type = "warning",
      singleButton = false
    ) {
      const swal = this.$swal.fire({
        title,
        type,
        showCloseButton: false,

        showCancelButton: !singleButton,
        showConfirmButton: true,
        confirmButtonText: `${this.$t("button.ok")}`,
        cancelButtonText: `${this.$t("button.close")}`
      });
      return swal;
    }
  }
};