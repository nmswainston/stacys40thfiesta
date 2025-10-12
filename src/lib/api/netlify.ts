export function encodeFormData(data: [string, FormDataEntryValue][]): string {
  return new URLSearchParams(data as [string, string][]).toString();
}

export async function postNetlifyForm(formName: string, formEl: HTMLFormElement): Promise<Response> {
  const fd = new FormData(formEl);
  fd.append("form-name", formName);
  const body = encodeFormData(Array.from(fd.entries()));
  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
}

