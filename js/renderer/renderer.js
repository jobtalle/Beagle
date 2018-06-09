export function Renderer(myr, simulation) {
    const update = timeStep => {

    };

    const render = () => {
        myr.bind();
        myr.clear();

        simulation.getEnvironment().render(myr);

        myr.flush();
    };

    myr.setClearColor(new myr.Color(0, 0, 0, 0));
    myr.utils.loop(function(timeStep) {
        update(timeStep);
        render();
    });
}