import i18n from "@/lang";

export function generateTitle(title) {
  const hasKey = this.$te("route." + title);

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t("route." + title);

    return translatedTitle;
  }
  return title;
}

export function tableTitle(title) {
  const hasKey = i18n.te("table." + title);
  if (hasKey) {
    const translatedTitle = i18n.t("table." + title);
    return translatedTitle;
  }
  return title;
}
