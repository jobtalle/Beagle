export function Inspector() {
    const ID_INSPECTOR = "inspector";

    const createReport = instance => {
        element.appendChild(document.createTextNode("Hello"));
    };

    this.inspect = instance => {
        element.innerHTML = "";

        if (instance === null)
            return;

        createReport(instance);
    };

    const element = document.getElementById(ID_INSPECTOR);
}