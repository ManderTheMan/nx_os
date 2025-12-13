// A simulation of your "messy laptop"
export const MOCK_FILES = [
  { id: '1', name: 'project-nexus-v1.docx', path: '/documents/old', type: 'doc', status: 'duplicate', similarity: 0.95 },
  { id: '2', name: 'nexus_final_FINAL.pdf', path: '/desktop', type: 'pdf', status: 'duplicate', similarity: 0.95 },
  { id: '3', name: 'gym_routine_2023.txt', path: '/notes', type: 'txt', status: 'archived', similarity: 0.1 },
  { id: '4', name: 'react-app-test', path: '/dev/test', type: 'folder', status: 'active', similarity: 0.0 },
  { id: '5', name: 'screenshot_error_22.png', path: '/downloads', type: 'img', status: 'clutter', similarity: 0.0 },
];

export const SEARCH_RESULTS = [
  { id: '101', content: "Remember to integrate the Vector Vault", source: "Journal - Dec 10" },
  { id: '102', content: "Ollama requires 8GB RAM for this model", source: "Tech Specs" },
];