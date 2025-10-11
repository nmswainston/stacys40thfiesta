export function encodeFormData(data) {
    return new URLSearchParams(data).toString();
  }
  
  export async function postNetlifyForm(formName, formEl) {
    const fd = new FormData(formEl);
    fd.append("form-name", formName);
    const body = encodeFormData(Array.from(fd.entries()));
    return fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
  }
  