// Admin Dashboard Services
// This file contains all API calls and data handling for the admin dashboard

// API Base URL
const API_BASE_URL = '../backend/rest/api.php';

// Admin API Service Object
const AdminService = {
    // Get dashboard statistics
    getDashboardStats: async function() {
        try {
            const response = await fetch(`${API_BASE_URL}?action=get_admin_stats`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            // Return dummy data in case of error
            return {
                totalProperties: 145,
                totalUsers: 312,
                pendingApprovals: 8,
                recentSales: 24
            };
        }
    },

    // Get all properties
    getAllProperties: async function() {
        try {
            const response = await fetch(`${API_BASE_URL}?action=get_all_properties`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching properties:', error);
            return [];
        }
    },
    
    // Get property by ID
    getPropertyById: async function(id) {
        try {
            const response = await fetch(`${API_BASE_URL}?action=get_property&id=${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching property with ID ${id}:`, error);
            return null;
        }
    },
    
    // Update property
    updateProperty: async function(property) {
        try {
            const response = await fetch(`${API_BASE_URL}?action=update_property`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(property)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating property:', error);
            return { success: false, message: error.message };
        }
    },
    
    // Delete property
    deleteProperty: async function(id) {
        try {
            const response = await fetch(`${API_BASE_URL}?action=delete_property&id=${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error deleting property with ID ${id}:`, error);
            return { success: false, message: error.message };
        }
    },
    
    // Get all users
    getAllUsers: async function() {
        try {
            const response = await fetch(`${API_BASE_URL}?action=get_all_users`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    },
    
    // Get user by ID
    getUserById: async function(id) {
        try {
            const response = await fetch(`${API_BASE_URL}?action=get_user&id=${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error);
            return null;
        }
    },
    
    // Update user
    updateUser: async function(user) {
        try {
            const response = await fetch(`${API_BASE_URL}?action=update_user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating user:', error);
            return { success: false, message: error.message };
        }
    },
    
    // Delete user
    deleteUser: async function(id) {
        try {
            const response = await fetch(`${API_BASE_URL}?action=delete_user&id=${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
            return { success: false, message: error.message };
        }
    },
    
    // Get site settings
    getSettings: async function() {
        try {
            const response = await fetch(`${API_BASE_URL}?action=get_settings`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching settings:', error);
            return {};
        }
    },
    
    // Update site settings
    updateSettings: async function(settings) {
        try {
            const response = await fetch(`${API_BASE_URL}?action=update_settings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(settings)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating settings:', error);
            return { success: false, message: error.message };
        }
    }
};

// Export the service
window.AdminService = AdminService;
