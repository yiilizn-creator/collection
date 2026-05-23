import { contactMethods } from "@/data/portfolio";

/** 汇总联系方式与社交名称，供页尾一键复制 */
export function getAllContactsText() {
  return contactMethods.map((item) => item.copyText).join("\n");
}

export async function copyAllContacts(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(getAllContactsText());
    return true;
  } catch {
    return false;
  }
}
