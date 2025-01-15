export const horizontalGradient = (context, colors) => {
    if (!context.element.x || !context.element.width) {
        return;
    }

    const { ctx } = context.chart;

    const backgroundOne = ctx.createLinearGradient(0, 0, 0, 600);

    backgroundOne.addColorStop(0, colors[0]);
    backgroundOne.addColorStop(0.5, colors[1]);
    backgroundOne.addColorStop(1, colors[1]);

    return backgroundOne;
};
