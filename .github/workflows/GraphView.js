const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');  // Fetch API를 사용할 경우 필요

const repoPath = './';  // 리포지토리의 경로
const markdownFiles = [];

// 재귀적으로 .md 파일을 찾는 함수
function findMarkdownFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            findMarkdownFiles(filePath);
        } else if (file.endsWith('.md')) {
            markdownFiles.push(filePath);
        }
    });
}

// 태그를 추출하는 함수 (두 가지 패턴 처리)
function extractTags(content) {
    let tags = [];

    // 첫 번째 패턴: YAML 형식의 tags 추출
    const yamlPattern = /tags:\s*\n(?:\s*-?\s*(\w+))+/g;
    let match;
    while ((match = yamlPattern.exec(content)) !== null) {
        tags.push(match[1]);
    }

    // 두 번째 패턴: #으로 시작하는 태그 추출
    const hashTagPattern = /#(\w+)/g;
    while ((match = hashTagPattern.exec(content)) !== null) {
        tags.push(match[1]);
    }

    return tags;
}

// 노드와 링크 데이터를 생성하는 함수
function generateGraphData() {
    const nodes = [];
    const links = [];
    const tagMap = new Map();  // 각 태그가 포함된 .md 파일을 추적

    markdownFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf-8');
        const tags = extractTags(content);

        // 파일을 노드로 추가
        nodes.push({ id: file, group: 1 });

        // 태그들을 노드로 추가하고, 링크를 생성
        tags.forEach(tag => {
            let tagNode = { id: tag, group: 2 };

            // 태그가 이미 노드에 있는지 확인하고 없으면 추가
            if (!nodes.some(node => node.id === tag)) {
                nodes.push(tagNode);
            }

            // 태그와 파일 간의 링크 생성
            links.push({ source: tag, target: file, value: 1 });
        });
    });

    return { nodes, links };
}

// 파일을 생성하는 함수
function writeGraphData() {
    const graphData = generateGraphData();
    fs.writeFileSync('graphView.json', JSON.stringify(graphData, null, 2));
}

// 초기화 및 실행
findMarkdownFiles(repoPath);
writeGraphData();
