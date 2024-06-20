import G6 from '@antv/g6';
import { GraphLayoutPredict } from '@antv/vis-predict-engine';
export async function drawFun(containerId = 'container', data) {
  let showNodes = [];
  let showEdges = [];
  let curShowNodes = [];
  let curShowEdges = [];
  let nodes = [];
  let edges = [];
  let nodeMap = new Map();
  let edgesMap = new Map();
  let curShowNodesMap = new Map();
  let highlighting = false;
  let currentFocus;
  const width = document.getElementById(containerId).scrollWidth;
  const height = document.getElementById(containerId).scrollHeight || 500;

  const LIMIT_OVERFLOW_WIDTH = width;
  const LIMIT_OVERFLOW_HEIGHT = height;

  // range nodes size
  const mapNodesSize = (nodes, propertyName, visualRange) => {
    let minp = 9999999999;
    let maxp = -9999999999;
    nodes.forEach((node) => {
      minp = node[propertyName] < minp ? node[propertyName] : minp;
      maxp = node[propertyName] > maxp ? node[propertyName] : maxp;
    });
    const rangepLength = maxp - minp;
    const rangevLength = visualRange[1] - visualRange[0];
    nodes.forEach((node) => {
      if (node[propertyName]) {
        node.size = ((node[propertyName] - minp) / rangepLength) * rangevLength + visualRange[0];
      } else {
        node.size = Math.floor(Math.random() * (visualRange[1] - visualRange[0])) + visualRange[0];
      }
    });
  };
  // range node size
  const mapNodeSize = (node, kidCount, visualRange, propertyName = 'childrenNum') => {
    if (kidCount) {
      let minp = 9999999999;
      let maxp = -9999999999;
      minp = node[propertyName] < minp ? node[propertyName] : minp;
      maxp = node[propertyName] > maxp ? node[propertyName] : maxp;
      const rangepLength = maxp - minp;
      const rangevLength = visualRange[1] - visualRange[0];
      node.size = ((kidCount - minp) / rangepLength) * rangevLength + visualRange[0];
    } else {
      node.size = Math.floor(Math.random() * (visualRange[1] - visualRange[0])) + visualRange[0];
    }
  }

  const lightColors = [
    '#8FE9FF',
    '#87EAEF',
    '#FFC9E3',
    '#A7C2FF',
    '#FFA1E3',
    '#FFE269',
    '#BFCFEE',
    '#FFA0C5',
    '#D5FF86',
  ];
  const darkColors = [
    '#7DA8FF',
    '#44E6C1',
    '#FF68A7',
    '#7F86FF',
    '#AE6CFF',
    '#FF5A34',
    '#5D7092',
    '#FF6565',
    '#6BFFDE',
  ];
  const uLightColors = [
    '#CFF6FF',
    '#BCFCFF',
    '#FFECF5',
    '#ECFBFF',
    '#EAD9FF',
    '#FFF8DA',
    '#DCE2EE',
    '#FFE7F0',
    '#EEFFCE',
  ];
  const uDarkColors = [
    '#CADBFF',
    '#A9FFEB',
    '#FFC4DD',
    '#CACDFF',
    '#FFD4F2',
    '#FFD3C9',
    '#EBF2FF',
    '#FFCBCB',
    '#CAFFF3',
  ];

  const gColors = [];
  const gColors2 = [];
  const unlightColorMap = new Map();
  lightColors.forEach((lcolor, i) => {
    gColors.push('l(0) 0:' + lcolor + ' 1:' + darkColors[i]);
    gColors2.push('l(0) 0:' + darkColors[i] + ' 1:' + lcolor);
    unlightColorMap.set(gColors[i], 'l(0) 0:' + uLightColors[i] + ' 1:' + uDarkColors[i]);
  });

  let graph;
  // const { predictLayout, confidence } = await GraphLayoutPredict.predict(data);
  const layoutCfg = {
    type: 'force',
    // type: predictLayout,
    nodeSize: (d) => {
      return d.size / 2 + 5;
    },
    nodeStrength: -200,
    collideStrength: 1,
    alphaDecay: 0.2,
    preventOverlap: true,
    onTick: () => {
      const nodeItems = graph.getNodes();
      const height = graph.get('height');
      const width = graph.get('width');
      const padding = 10;
      nodeItems.forEach((item) => {
        const model = item.getModel();
        if (model.x > width - padding) model.x = width - padding;
        else if (model.x < padding) model.x = padding;

        if (model.y > height - padding) model.y = height - padding;
        else if (model.y < padding) model.y = padding;
      });
    },
  };

  G6.registerNode(
    'bubble',
    {
      drawShape(cfg, group) {
        const self = this;
        const r = cfg.size / 2;
        // a circle by path
        const path = [
          ['M', -r, 0],
          ['C', -r, r / 2, -r / 2, r, 0, r],
          ['C', r / 2, r, r, r / 2, r, 0],
          ['C', r, -r / 2, r / 2, -r, 0, -r],
          ['C', -r / 2, -r, -r, -r / 2, -r, 0],
          ['Z'],
        ];
        const keyShape = group.addShape('path', {
          attrs: {
            x: 0,
            y: 0,
            path,
            fill: cfg.color || 'steelblue',
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: 'path-shape',
        });

        const mask = group.addShape('path', {
          attrs: {
            x: 0,
            y: 0,
            path,
            opacity: 0.25,
            fill: cfg.color || 'steelblue',
            shadowColor: cfg.color.split(' ')[2].substr(2),
            shadowBlur: 40,
            shadowOffsetX: 0,
            shadowOffsetY: 30,
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: 'mask-shape',
        });

        const spNum = 10; // split points number
        const directions = [],
          rs = [];
        self.changeDirections(spNum, directions);
        for (let i = 0; i < spNum; i++) {
          const rr = r + directions[i] * ((Math.random() * r) / 1000); // +-r/6, the sign according to the directions
          if (rs[i] < 0.97 * r) rs[i] = 0.97 * r;
          else if (rs[i] > 1.03 * r) rs[i] = 1.03 * r;
          rs.push(rr);
        }
        keyShape.animate(
          () => {
            const path = self.getBubblePath(r, spNum, directions, rs);
            return { path };
          },
          {
            repeat: true,
            duration: 10000,
          },
        );

        const directions2 = [],
          rs2 = [];
        self.changeDirections(spNum, directions2);
        for (let i = 0; i < spNum; i++) {
          const rr = r + directions2[i] * ((Math.random() * r) / 1000); // +-r/6, the sign according to the directions
          if (rs2[i] < 0.97 * r) rs2[i] = 0.97 * r;
          else if (rs2[i] > 1.03 * r) rs2[i] = 1.03 * r;
          rs2.push(rr);
        }
        mask.animate(
          () => {
            const path = self.getBubblePath(r, spNum, directions2, rs2);
            return { path };
          },
          {
            repeat: true,
            duration: 10000,
          },
        );
        return keyShape;
      },
      changeDirections(num, directions) {
        for (let i = 0; i < num; i++) {
          if (!directions[i]) {
            const rand = Math.random();
            const dire = rand > 0.5 ? 1 : -1;
            directions.push(dire);
          } else {
            directions[i] = -1 * directions[i];
          }
        }
        return directions;
      },
      getBubblePath(r, spNum, directions, rs) {
        const path = [];
        const cpNum = spNum * 2; // control points number
        const unitAngle = (Math.PI * 2) / spNum; // base angle for split points
        let angleSum = 0;
        const sps = [];
        const cps = [];
        for (let i = 0; i < spNum; i++) {
          const speed = 0.001 * Math.random();
          rs[i] = rs[i] + directions[i] * speed * r; // +-r/6, the sign according to the directions
          if (rs[i] < 0.97 * r) {
            rs[i] = 0.97 * r;
            directions[i] = -1 * directions[i];
          } else if (rs[i] > 1.03 * r) {
            rs[i] = 1.03 * r;
            directions[i] = -1 * directions[i];
          }
          const spX = rs[i] * Math.cos(angleSum);
          const spY = rs[i] * Math.sin(angleSum);
          sps.push({ x: spX, y: spY });
          for (let j = 0; j < 2; j++) {
            const cpAngleRand = unitAngle / 3;
            const cpR = rs[i] / Math.cos(cpAngleRand);
            const sign = j === 0 ? -1 : 1;
            const x = cpR * Math.cos(angleSum + sign * cpAngleRand);
            const y = cpR * Math.sin(angleSum + sign * cpAngleRand);
            cps.push({ x, y });
          }
          angleSum += unitAngle;
        }
        path.push(['M', sps[0].x, sps[0].y]);
        for (let i = 1; i < spNum; i++) {
          path.push([
            'C',
            cps[2 * i - 1].x,
            cps[2 * i - 1].y,
            cps[2 * i].x,
            cps[2 * i].y,
            sps[i].x,
            sps[i].y,
          ]);
        }
        path.push(['C', cps[cpNum - 1].x, cps[cpNum - 1].y, cps[0].x, cps[0].y, sps[0].x, sps[0].y]);
        path.push(['Z']);
        return path;
      },
      setState(name, value, item) {
        const shape = item.get('keyShape');
        if (name === 'dark') {
          if (value) {
            if (shape.attr('fill') !== '#fff') {
              shape.oriFill = shape.attr('fill');
              const uColor = unlightColorMap.get(shape.attr('fill'));
              shape.attr('fill', uColor);
            } else {
              shape.attr('opacity', 0.2);
            }
          } else {
            if (shape.attr('fill') !== '#fff') {
              shape.attr('fill', shape.oriFill || shape.attr('fill'));
            } else {
              shape.attr('opacity', 1);
            }
          }
        }
      },
    },
    'single-node',
  );

  G6.registerNode(
    'animate-circle',
    {
      setState(name, value, item) {
        const shape = item.get('keyShape');
        const label = shape.get('parent').get('children')[1];
        if (name === 'disappearing' && value) {
          shape.animate(
            (ratio) => {
              return {
                opacity: 1 - ratio,
                r: shape.attr('r') * (1 - ratio),
              };
            },
            {
              duration: 200,
            },
          );
          label.animate(
            (ratio) => {
              return {
                opacity: 1 - ratio,
              };
            },
            {
              duration: 500,
            },
          );
        } else if (name === 'appearing' && value) {
          const r = item.getModel().size / 2;
          shape.animate(
            (ratio) => {
              return {
                opacity: ratio,
                r: r * ratio,
                fill: shape.attr('fill'),
              };
            },
            {
              duration: 300,
            },
          );
          label.animate(
            {
              onFrame(ratio) {
                return {
                  opacity: ratio,
                };
              },
            },
            {
              duration: 300,
            },
          );
        } else if (name === 'dark') {
          if (value) {
            if (shape.attr('fill') !== '#fff') {
              shape.oriFill = shape.attr('fill');
              const uColor = unlightColorMap.get(shape.attr('fill'));
              shape.attr('fill', uColor);
            } else {
              shape.attr('opacity', 0.2);
              label.attr('fill', '#A3B1BF');
            }
          } else {
            if (shape.attr('fill') !== '#fff') {
              shape.attr('fill', shape.oriFill || shape.attr('fill'));
            } else {
              shape.attr('opacity', 1);
              label.attr('fill', '#697B8C');
            }
          }
        }
      },
    },
    'circle',
  );

  G6.registerEdge(
    'animate-line',
    {
      drawShape(cfg, group) {
        const self = this;
        let shapeStyle = self.getShapeStyle(cfg);
        shapeStyle = Object.assign(shapeStyle, {
          opacity: 0,
          strokeOpacity: 0,
        });
        const keyShape = group.addShape('path', {
          attrs: shapeStyle,
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: 'path-shape',
        });
        return keyShape;
      },
      afterDraw(cfg, group) {
        const shape = group.get('children')[0];
        shape.animate(
          (ratio) => {
            const opacity = ratio * cfg.style.opacity;
            const strokeOpacity = ratio * cfg.style.strokeOpacity;
            return {
              opacity: ratio || opacity,
              strokeOpacity: ratio || strokeOpacity,
            };
          },
          {
            duration: 300,
          },
        );
      },
      setState(name, value, item) {
        const shape = item.get('keyShape');
        if (name === 'disappearing' && value) {
          shape.animate(
            (ratio) => {
              return {
                opacity: 1 - ratio,
                strokeOpacity: 1 - ratio,
              };
            },
            {
              duration: 200,
            },
          );
        } else if (name === 'dark') {
          if (value) shape.attr('opacity', 0.2);
          else shape.attr('opacity', 1);
        }
      },
    },
    'line',
  );

  graph = new G6.Graph({
    container: containerId,
    width,
    height,
    linkCenter: true,
    layout: layoutCfg,
    modes: {
      default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
    },
    defaultNode: {
      type: 'bubble',
      size: 95,
      labelCfg: {
        position: 'center',
        style: {
          fill: 'white',
          fontStyle: 'bold',
        },
      },
    },
    defaultEdge: {
      color: '#888',
      type: 'animate-line', //'animate-line'
    },
  });
  graph.get('canvas').set('localRefresh', false);

  function translate(x, y) {
    let moveX = x;
    let moveY = y;

    /* 获得当前偏移量*/
    const group = graph.get('group');
    const bbox = group.getBBox();
    const leftTopPoint = graph.getCanvasByPoint(bbox.minX, bbox.minY);
    const rightBottomPoint = graph.getCanvasByPoint(bbox.maxX, bbox.maxY);
    /* 如果 x 轴在区域内，不允许左右超过100 */
    if (x < 0 && leftTopPoint.x - x > LIMIT_OVERFLOW_WIDTH) {
      moveX = 0;
    }
    if (x > 0 && rightBottomPoint.x - x < width - LIMIT_OVERFLOW_WIDTH) {
      moveX = 0;
    }

    if (y < 0 && leftTopPoint.y - y > LIMIT_OVERFLOW_HEIGHT) {
      moveY = 0;
    }
    if (y > 0 && rightBottomPoint.y - y < height - LIMIT_OVERFLOW_HEIGHT) {
      moveY = 0;
    }
    graph.translate(-moveX, -moveY);
  }

  function refreshDragedNodePosition(e) {
    const model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
  }
  graph.on('node:dragstart', (e) => {
    graph.layout();
    refreshDragedNodePosition(e);
  });
  graph.on('node:drag', (e) => {
    refreshDragedNodePosition(e);
  });
  graph.on('node:dragend', (e) => {
    e.item.get('model').fx = null;
    e.item.get('model').fy = null;
  });

  const loadData = async (data) => {
    nodes = data.nodes;
    edges = data.edges;
    showNodes = [];
    showEdges = [];
    nodeMap = new Map();
    edgesMap = new Map();
    // find the roots
    nodes.forEach((node) => {
      if (!node.isLeaf) {
        const num = node.childrenNum ? `\n(${node.childrenNum})` : '';
        node.label = `${node.name}${num}`;
      } else {
        node.label = node.name;
      }
      nodeMap.set(node.id, node);
      if (node.level === 0) {
        node.color = gColors[showNodes.length % gColors.length];
        console.log('node.color', node.color);
        node.style = {
          fill: gColors[showNodes.length % gColors.length],
          lineWidth: 0,
        };
        node.labelCfg = {
          style: {
            fontSize: 25,
            fill: '#fff',
            fontWeight: 300,
          },
        };
        node.x = Math.random() * 800;
        node.y = Math.random() * 800;
        mapNodeSize(node, node.childrenNum,[90, 100])
        showNodes.push(node);
      } else {
        const parent = nodeMap.get(node.tags[0]);
        if (!node.isLeaf) {
          node.color = gColors2[showNodes.length % gColors.length];
          console.log('node.color', node.color);
          node.style = {
            fill: gColors2[showNodes.length % gColors.length],
            lineWidth: 0,
          };
          mapNodeSize(node, null,[70, 80])
          showNodes.push(node);
        } else {
          // 叶子节点
          const parent = nodeMap.get(node.tags[0]);
          const tag = node.tag;
          const tags = node.tags;
          const tlength = tags.length;
          const parents = []
          let isChild = false;
          for (let i = 0; i < tlength; i++) {
            const ts = tags[i].split('-');
            if (ts[0] === tag) {
              isChild = true;
            }
            parents.push(nodeMap.get(ts[0]));
          }
          console.log(581581, node.name, parents);

          if (!node.style) node.style = {};
          node.style.lineWidth = 0;
          node.style.opacity = 1;
          node.type = 'animate-circle';
          let color = 'l(0)';
          const parentsNum = parents.length;
          if (!parent) {
            // 是叶子无父级，独身一人
            color = uDarkColors[0]
          } else {
            parents.forEach((parent, i) => {
              const parentColor = parent.color.split(' ')[1].substr(2);
              color += ` ${i / (parentsNum - 1)}:${parentColor}`;
            });
            if (parentsNum === 1) {
              color = parent.color.split(' ')[1].substr(2);
            }
          }
          node.color = color;
          // node.style.fill = color;
          node.style.fill = '#fff';
          node.style.lineWidth = 1;
          node.size = 30;
          node.labelCfg = {
            style: {
              fontSize: 11,
              lineHeight: 19,
              fill: '#697B8C',
            },
            position: 'center',
          };
          showNodes.push(node);
        }
      }
    });

    // mapNodesSize(showNodes, 'childrenNum', [50, 120]);

    edges.forEach((edge) => {
      // map the id
      edge.id = `${edge.source}-${edge.target}`;
      edge.style = {
        lineWidth: 0.5,
        opacity: 1,
        strokeOpacity: 1,
      };
      const targetNode = nodeMap.get(edge.target);
      edge.color = targetNode.color;
      edgesMap.set(edge.id, edge);
      showEdges.push(edge)
    });

    graph.data({
      nodes: showNodes,
      edges: showEdges,
    });
    graph.render();
  };

  loadData(data)



  graph.on('node:mouseenter', (e) => {
    const item = e.item;
    const model = item.getModel();
    if (model.level === 0) {
      return;
    }
    highlighting = true;
    graph.setAutoPaint(false);
    const nodeItems = graph.getNodes();
    const edgeItems = graph.getEdges();
    nodeItems.forEach((node) => {
      graph.setItemState(node, 'dark', true);
      node.getModel().light = false;
    });
    graph.setItemState(item, 'dark', false);
    model.light = true;
    const tags = model.tags;
    const findTagsMap = new Map();
    let mid = 0;

    let fTag = '';
    // if the model is F node, find the leaves of it
    if (!model.isLeaf && model.level !== 0) {
      fTag = model.tag;
      nodeItems.forEach((item) => {
        const itemModel = item.getModel();
        if (!itemModel.isLeaf) return;
        const modelTags = itemModel.tags;
        modelTags.forEach((mt) => {
          const mts = mt.split('-');
          if (mts[1] === fTag) {
            graph.setItemState(item, 'dark', false);
            itemModel.light = true;
          }
        });
      });
    }

    // find the tags
    tags.forEach((t) => {
      const ts = t.split('-');
      findTagsMap.set(ts[0], mid);
      mid++;
      if (ts[1]) {
        findTagsMap.set(ts[1], mid);
        mid++;
      }
    });
    // find the nodes with tag === tags[?]
    nodeItems.forEach((item) => {
      const node = item.getModel();
      if (findTagsMap.get(node.tag) !== undefined) {
        graph.setItemState(item, 'dark', false);
        node.light = true;
      }
    });
    edgeItems.forEach((item) => {
      const source = item.getSource().getModel();
      const target = item.getTarget().getModel();
      if (source.light && target.light) {
        graph.setItemState(item, 'dark', false);
      } else {
        graph.setItemState(item, 'dark', true);
      }
    });
    graph.paint();
    graph.setAutoPaint(true);
  });

  graph.on('node:mouseleave', () => {
    if (highlighting) {
      const nodeItems = graph.getNodes();
      const edgeItems = graph.getEdges();
      highlighting = false;
      nodeItems.forEach((item) => {
        graph.setItemState(item, 'dark', false);
      });
      edgeItems.forEach((item) => {
        graph.setItemState(item, 'dark', false);
      });
    }
  });


}
