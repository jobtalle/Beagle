export function Renderer(myr, view, simulation) {
    const update = timeStep => {

    };

    const render = () => {
        myr.bind();
        myr.clear();

        myr.push();
        myr.transform(view.getTransform());

        simulation.getEnvironment().render(myr, view.getScale());

        myr.pop();

        myr.flush();
    };

    myr.setClearColor(new myr.Color(0, 0, 0, 0));
    myr.utils.loop(timeStep => {
        update(timeStep);
        render();

        return true;
    });
}