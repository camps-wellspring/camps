import i18n from "@/lang";

const createTableHeaders = (headersName = []) => {
  return headersName.map(header => {
    return {
      text: header ? i18n.t(`table.${header}`) : "",
      align: "center",
      sortable: false,
      width:
        header === "edit" ||
        header === "delete" ||
        header === "details" ||
        header === "report"
          ? "1"
          : ""
    };
  });
};
export default createTableHeaders;
