/**
 * API Module - Handles all communication with backend
 * 
 * Functions:
 * - createProject()
 * - getProjects()
 * - getProject()
 * - generateAIResponse()
 * - exportProject()
 * - addMessage()
 */

const API = {
  /**
   * Create a new project
   */
  createProject: async (projectData) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  /**
   * Get all projects
   */
  getProjects: async () => {
    try {
      const response = await fetch('/api/projects');
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  /**
   * Get specific project
   */
  getProject: async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

  /**
   * Generate AI teammate response
   */
  generateAIResponse: async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/ai-response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate AI response');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  },

  /**
   * Export project as Markdown
   */
  exportProject: async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to export project');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error exporting project:', error);
      throw error;
    }
  },

  /**
   * Add message to project conversation
   */
  addMessage: async (projectId, speaker, message) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ speaker, message })
      });
      
      if (!response.ok) {
        throw new Error('Failed to add message');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  }
};
