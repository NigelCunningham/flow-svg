        function decision(options) {
            var shape, text, txtbox,
                group = chartGroup.group(),
                coords =
                "0," +
                config.decisionHeight / 2 +
                " " + config.decisionWidth / 2 +
                ",0 " + config.decisionWidth +
                "," + config.decisionHeight / 2 +
                " " + config.decisionWidth / 2 + ","
                + config.decisionHeight;

            shape = group.polygon(coords)
                .attr({
                    fill: config.decisionFill,
                    "class": 'fc-rhombus'
                });
            group.attr('class', 'fc-decision');

            text = group.text(function (add) {
                options.text.forEach(function (l) {
                    add.tspan(l).newLine().attr('text-anchor', 'middle');
                });
            });
            text.fill(config.decisionTextColour).font({size: config.decisionFontSize});

            text.cx(shape.cx() + text.bbox().width / 2 + text.bbox().x);
            text.cy(shape.cy());

            // Dealing with links
            if (options.links) {
              options.links.forEach(function (l) {
                var url = draw.link(l.url),
                    txt = draw.text(l.text),
                    tbox;
                url.add(txt);
                if (l.target) {
                  url.target(l.target);
                }
                txt.fill(config.finishLinkColour).font({size: config.finishFontSize});
                tbox = text.bbox();
                txtbox = txt.bbox();
                txt.dmove(tbox.cx - txtbox.cx, tbox.y2 + 15);
                group.add(url);
              });
            }
            return group;
        }