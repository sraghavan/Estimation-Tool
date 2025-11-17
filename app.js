class EstimationTool {
    constructor() {
        this.currentUser = null;
        this.currentCategoryId = null;
        this.currentProjectId = null;
        this.initializeData();
        this.bindEvents();
    }

    initializeData() {
        if (!localStorage.getItem('estimationTool')) {
            const initialData = {
                categories: {
                    'cat1': {
                        id: 'cat1',
                        name: 'Development',
                        steps: [
                            {
                                name: 'Analysis',
                                estimates: {
                                    'Small': {
                                        'XS': 1,
                                        'S': 2,
                                        'M': 4,
                                        'L': 8,
                                        'XL': 16
                                    },
                                    'Medium': {
                                        'XS': 1.5,
                                        'S': 3,
                                        'M': 6,
                                        'L': 12,
                                        'XL': 24
                                    },
                                    'Large': {
                                        'XS': 2,
                                        'S': 4,
                                        'M': 8,
                                        'L': 16,
                                        'XL': 32
                                    }
                                }
                            },
                            {
                                name: 'Design',
                                estimates: {
                                    'Small': {
                                        'XS': 2,
                                        'S': 4,
                                        'M': 8,
                                        'L': 16,
                                        'XL': 24
                                    },
                                    'Medium': {
                                        'XS': 3,
                                        'S': 6,
                                        'M': 12,
                                        'L': 24,
                                        'XL': 36
                                    },
                                    'Large': {
                                        'XS': 4,
                                        'S': 8,
                                        'M': 16,
                                        'L': 32,
                                        'XL': 48
                                    }
                                }
                            },
                            {
                                name: 'Development',
                                estimates: {
                                    'Small': {
                                        'XS': 4,
                                        'S': 8,
                                        'M': 16,
                                        'L': 32,
                                        'XL': 48
                                    },
                                    'Medium': {
                                        'XS': 6,
                                        'S': 12,
                                        'M': 24,
                                        'L': 48,
                                        'XL': 72
                                    },
                                    'Large': {
                                        'XS': 8,
                                        'S': 16,
                                        'M': 32,
                                        'L': 64,
                                        'XL': 96
                                    }
                                }
                            },
                            {
                                name: 'Testing',
                                estimates: {
                                    'Small': {
                                        'XS': 2,
                                        'S': 4,
                                        'M': 8,
                                        'L': 12,
                                        'XL': 16
                                    },
                                    'Medium': {
                                        'XS': 3,
                                        'S': 6,
                                        'M': 12,
                                        'L': 18,
                                        'XL': 24
                                    },
                                    'Large': {
                                        'XS': 4,
                                        'S': 8,
                                        'M': 16,
                                        'L': 24,
                                        'XL': 32
                                    }
                                }
                            },
                            {
                                name: 'Code Review',
                                estimates: {
                                    'Small': {
                                        'XS': 1,
                                        'S': 2,
                                        'M': 3,
                                        'L': 4,
                                        'XL': 6
                                    },
                                    'Medium': {
                                        'XS': 1.5,
                                        'S': 3,
                                        'M': 4.5,
                                        'L': 6,
                                        'XL': 9
                                    },
                                    'Large': {
                                        'XS': 2,
                                        'S': 4,
                                        'M': 6,
                                        'L': 8,
                                        'XL': 12
                                    }
                                }
                            }
                        ]
                    },
                    'cat2': {
                        id: 'cat2',
                        name: 'Bug Fix',
                        steps: [
                            {
                                name: 'Investigation',
                                estimates: {
                                    'Small': {
                                        'XS': 0.5,
                                        'S': 1,
                                        'M': 2,
                                        'L': 4,
                                        'XL': 8
                                    },
                                    'Medium': {
                                        'XS': 1,
                                        'S': 2,
                                        'M': 3,
                                        'L': 6,
                                        'XL': 12
                                    },
                                    'Large': {
                                        'XS': 1.5,
                                        'S': 3,
                                        'M': 4,
                                        'L': 8,
                                        'XL': 16
                                    }
                                }
                            },
                            {
                                name: 'Implementation',
                                estimates: {
                                    'Small': {
                                        'XS': 1,
                                        'S': 2,
                                        'M': 4,
                                        'L': 8,
                                        'XL': 12
                                    },
                                    'Medium': {
                                        'XS': 2,
                                        'S': 3,
                                        'M': 6,
                                        'L': 12,
                                        'XL': 18
                                    },
                                    'Large': {
                                        'XS': 3,
                                        'S': 4,
                                        'M': 8,
                                        'L': 16,
                                        'XL': 24
                                    }
                                }
                            },
                            {
                                name: 'Testing',
                                estimates: {
                                    'Small': {
                                        'XS': 0.5,
                                        'S': 1,
                                        'M': 2,
                                        'L': 4,
                                        'XL': 6
                                    },
                                    'Medium': {
                                        'XS': 1,
                                        'S': 1.5,
                                        'M': 3,
                                        'L': 6,
                                        'XL': 9
                                    },
                                    'Large': {
                                        'XS': 1.5,
                                        'S': 2,
                                        'M': 4,
                                        'L': 8,
                                        'XL': 12
                                    }
                                }
                            },
                            {
                                name: 'Code Review',
                                estimates: {
                                    'Small': {
                                        'XS': 0.25,
                                        'S': 0.5,
                                        'M': 1,
                                        'L': 2,
                                        'XL': 3
                                    },
                                    'Medium': {
                                        'XS': 0.5,
                                        'S': 0.75,
                                        'M': 1.5,
                                        'L': 3,
                                        'XL': 4.5
                                    },
                                    'Large': {
                                        'XS': 0.75,
                                        'S': 1,
                                        'M': 2,
                                        'L': 4,
                                        'XL': 6
                                    }
                                }
                            }
                        ]
                    },
                    'cat3': {
                        id: 'cat3',
                        name: 'Integration',
                        steps: [
                            {
                                name: 'API Design',
                                estimates: {
                                    'Small': {
                                        'XS': 2,
                                        'S': 4,
                                        'M': 8,
                                        'L': 12,
                                        'XL': 16
                                    },
                                    'Medium': {
                                        'XS': 3,
                                        'S': 6,
                                        'M': 12,
                                        'L': 18,
                                        'XL': 24
                                    },
                                    'Large': {
                                        'XS': 4,
                                        'S': 8,
                                        'M': 16,
                                        'L': 24,
                                        'XL': 32
                                    }
                                }
                            },
                            {
                                name: 'Implementation',
                                estimates: {
                                    'Small': {
                                        'XS': 4,
                                        'S': 8,
                                        'M': 16,
                                        'L': 24,
                                        'XL': 32
                                    },
                                    'Medium': {
                                        'XS': 6,
                                        'S': 12,
                                        'M': 24,
                                        'L': 36,
                                        'XL': 48
                                    },
                                    'Large': {
                                        'XS': 8,
                                        'S': 16,
                                        'M': 32,
                                        'L': 48,
                                        'XL': 64
                                    }
                                }
                            },
                            {
                                name: 'Testing',
                                estimates: {
                                    'Small': {
                                        'XS': 2,
                                        'S': 4,
                                        'M': 8,
                                        'L': 12,
                                        'XL': 16
                                    },
                                    'Medium': {
                                        'XS': 3,
                                        'S': 6,
                                        'M': 12,
                                        'L': 18,
                                        'XL': 24
                                    },
                                    'Large': {
                                        'XS': 4,
                                        'S': 8,
                                        'M': 16,
                                        'L': 24,
                                        'XL': 32
                                    }
                                }
                            },
                            {
                                name: 'Documentation',
                                estimates: {
                                    'Small': {
                                        'XS': 1,
                                        'S': 2,
                                        'M': 4,
                                        'L': 6,
                                        'XL': 8
                                    },
                                    'Medium': {
                                        'XS': 1.5,
                                        'S': 3,
                                        'M': 6,
                                        'L': 9,
                                        'XL': 12
                                    },
                                    'Large': {
                                        'XS': 2,
                                        'S': 4,
                                        'M': 8,
                                        'L': 12,
                                        'XL': 16
                                    }
                                }
                            }
                        ]
                    }
                },
                complexitySizes: ['XS', 'S', 'M', 'L', 'XL'],
                storySizes: ['Small', 'Medium', 'Large'],
                storyTypes: {},
                projects: {},
                users: [
                    { id: 'estimator', name: 'Estimator', role: 'estimator' },
                    { id: 'admin', name: 'Admin', role: 'admin' }
                ],
                resources: [
                    { id: 'dev1', name: 'Senior Developer', type: 'human' },
                    { id: 'dev2', name: 'Junior Developer', type: 'human' },
                    { id: 'ai1', name: 'AI Agent - Code', type: 'ai' },
                    { id: 'ai2', name: 'AI Agent - Testing', type: 'ai' }
                ]
            };
            localStorage.setItem('estimationTool', JSON.stringify(initialData));
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem('estimationTool'));
    }

    saveData(data) {
        localStorage.setItem('estimationTool', JSON.stringify(data));
    }

    bindEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderCategories();
        });
    }

    login(userType) {
        this.currentUser = userType;
        document.getElementById('current-user').textContent = userType.charAt(0).toUpperCase() + userType.slice(1);
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('main-screen').classList.add('active');
        this.renderCategories();
        this.renderProjects();
        this.populateProjectSelector();
    }

    logout() {
        this.currentUser = null;
        document.getElementById('login-screen').classList.add('active');
        document.getElementById('main-screen').classList.remove('active');
    }

    showTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        event.target.classList.add('active');
        document.getElementById(tabName).classList.add('active');

        if (tabName === 'estimation-matrix') {
            this.renderCategories();
        } else if (tabName === 'projects') {
            this.renderProjects();
        } else if (tabName === 'project-plan') {
            this.populateProjectSelector();
        }
    }

    renderCategories() {
        const data = this.getData();
        const container = document.getElementById('story-types-container');
        container.innerHTML = '';

        Object.values(data.categories).forEach(category => {
            const categoryElement = this.createCategoryElement(category);
            container.appendChild(categoryElement);
        });

        if (this.currentUser !== 'admin') {
            const addBtn = document.querySelector('.section-header .add-btn');
            if (addBtn) addBtn.style.display = 'none';
        }
    }

    createCategoryElement(category) {
        const div = document.createElement('div');
        div.className = 'category-card';
        const data = this.getData();

        div.innerHTML = `
            <div class="category-header">
                <h3>${category.name}</h3>
                <div class="category-actions">
                    ${this.currentUser === 'admin' ? `
                        <button class="edit-btn" onclick="app.editCategory('${category.id}')">Edit</button>
                        <button class="delete-btn" onclick="app.deleteCategory('${category.id}')">Delete</button>
                    ` : ''}
                </div>
            </div>
            <div class="estimation-grid-3d">
                ${data.storySizes.map(size => `
                    <div class="size-section">
                        <h4 class="size-title">${size} Stories</h4>
                        <table class="estimation-table">
                            <thead>
                                <tr>
                                    <th>Step</th>
                                    ${data.complexitySizes.map(complexity => `<th>${complexity}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${category.steps.map(step => `
                                    <tr>
                                        <td class="step-name">${step.name}</td>
                                        ${data.complexitySizes.map(complexity => `
                                            <td class="complexity-hours">${step.estimates[size][complexity] || 0}h</td>
                                        `).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `).join('')}
            </div>
        `;

        return div;
    }

    addCategory() {
        if (this.currentUser !== 'admin') {
            alert('Only admins can add categories');
            return;
        }
        this.currentCategoryId = null;
        document.getElementById('modal-title').textContent = 'Add Category';
        document.getElementById('category-name').value = '';
        document.getElementById('steps-container').innerHTML = '';
        this.addStep();
        document.getElementById('category-modal').classList.remove('hidden');
    }

    editCategory(id) {
        if (this.currentUser !== 'admin') {
            alert('Only admins can edit categories');
            return;
        }

        const data = this.getData();
        const category = data.categories[id];

        this.currentCategoryId = id;
        document.getElementById('modal-title').textContent = 'Edit Category';
        document.getElementById('category-name').value = category.name;

        const container = document.getElementById('steps-container');
        container.innerHTML = '';

        category.steps.forEach(step => {
            this.addStep(step.name, step.estimates);
        });

        document.getElementById('category-modal').classList.remove('hidden');
    }

    deleteCategory(id) {
        if (this.currentUser !== 'admin') {
            alert('Only admins can delete categories');
            return;
        }

        if (confirm('Are you sure you want to delete this category?')) {
            const data = this.getData();
            delete data.categories[id];
            this.saveData(data);
            this.renderCategories();
        }
    }

    addStep(name = '', estimates = {}) {
        const container = document.getElementById('steps-container');
        const div = document.createElement('div');
        div.className = 'step-form-3d';
        const data = this.getData();

        div.innerHTML = `
            <div class="step-name-input">
                <input type="text" placeholder="Step name" value="${name}" required>
                <button type="button" class="remove-step-btn" onclick="this.parentElement.parentElement.remove()">Remove</button>
            </div>
            <div class="size-complexity-grid">
                ${data.storySizes.map(size => `
                    <div class="size-inputs-section">
                        <h5>${size} Stories</h5>
                        <div class="complexity-inputs">
                            ${data.complexitySizes.map(complexity => `
                                <div class="complexity-input-group">
                                    <label>${complexity}</label>
                                    <input type="number"
                                           value="${estimates[size] && estimates[size][complexity] ? estimates[size][complexity] : ''}"
                                           step="0.25" min="0"
                                           data-size="${size}"
                                           data-complexity="${complexity}"
                                           placeholder="0" required>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        container.appendChild(div);
    }

    saveCategory() {
        const name = document.getElementById('category-name').value.trim();
        if (!name) {
            alert('Please enter a category name');
            return;
        }

        const stepForms = document.querySelectorAll('.step-form-3d');
        const steps = [];
        const data = this.getData();

        for (let form of stepForms) {
            const stepNameInput = form.querySelector('input[type="text"]');
            const estimateInputs = form.querySelectorAll('input[type="number"]');
            const stepName = stepNameInput.value.trim();

            if (!stepName) {
                alert('Please fill all step names');
                return;
            }

            const estimates = {};
            let allValid = true;

            // Initialize estimates structure
            data.storySizes.forEach(size => {
                estimates[size] = {};
            });

            estimateInputs.forEach(input => {
                const size = input.dataset.size;
                const complexity = input.dataset.complexity;
                const hours = parseFloat(input.value);

                if (isNaN(hours) || hours < 0) {
                    allValid = false;
                } else {
                    estimates[size][complexity] = hours;
                }
            });

            if (!allValid) {
                alert('Please fill all estimate values with valid numbers');
                return;
            }

            steps.push({ name: stepName, estimates });
        }

        if (steps.length === 0) {
            alert('Please add at least one step');
            return;
        }

        const id = this.currentCategoryId || 'cat' + Date.now();

        data.categories[id] = {
            id,
            name,
            steps
        };

        this.saveData(data);
        this.closeModal();
        this.renderCategories();
    }

    closeModal() {
        const categoryModal = document.getElementById('category-modal');
        if (categoryModal) categoryModal.classList.add('hidden');
    }

    renderProjects() {
        const data = this.getData();
        const container = document.getElementById('projects-list');
        container.innerHTML = '';

        Object.values(data.projects).forEach(project => {
            const projectElement = this.createProjectElement(project);
            container.appendChild(projectElement);
        });
    }

    createProjectElement(project) {
        const div = document.createElement('div');
        div.className = 'story-type-card';

        div.innerHTML = `
            <div class="story-type-header">
                <h3>${project.name}</h3>
                <div class="story-actions">
                    <button class="edit-btn" onclick="app.editProject('${project.id}')">Edit</button>
                    <button class="delete-btn" onclick="app.deleteProject('${project.id}')">Delete</button>
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <strong>Total Estimate: ${project.totalHours} hours</strong>
            </div>
            <div style="margin-top: 0.5rem; color: #7f8c8d;">
                ${project.lineItems.length} line items
            </div>
        `;

        return div;
    }

    createProject() {
        this.currentProjectId = null;
        document.getElementById('project-name').value = '';
        document.getElementById('project-line-items').innerHTML = '';
        document.getElementById('total-estimate').textContent = '0';
        document.getElementById('project-form').classList.remove('hidden');
        this.addLineItem();
    }

    editProject(id) {
        const data = this.getData();
        const project = data.projects[id];

        this.currentProjectId = id;
        document.getElementById('project-name').value = project.name;

        const container = document.getElementById('project-line-items');
        container.innerHTML = '';

        project.lineItems.forEach(item => {
            this.addLineItem(item);
        });

        this.updateProjectTotal();
        document.getElementById('project-form').classList.remove('hidden');
    }

    deleteProject(id) {
        if (confirm('Are you sure you want to delete this project?')) {
            const data = this.getData();
            delete data.projects[id];
            this.saveData(data);
            this.renderProjects();
        }
    }

    addLineItem(existingItem = null) {
        const data = this.getData();
        const container = document.getElementById('project-line-items');
        const div = document.createElement('div');
        div.className = 'line-item';

        div.innerHTML = `
            <div class="line-item-header">
                <strong>Line Item ${container.children.length + 1}</strong>
                <button type="button" class="delete-btn" onclick="app.removeLineItem(this)">Remove</button>
            </div>
            <div class="line-item-controls">
                <select class="category-select" onchange="app.updateLineItemEstimate(this)">
                    <option value="">Select Category</option>
                    ${Object.values(data.categories).map(cat => `
                        <option value="${cat.id}" ${existingItem && existingItem.categoryId === cat.id ? 'selected' : ''}>
                            ${cat.name}
                        </option>
                    `).join('')}
                </select>
                <select class="size-select" onchange="app.updateLineItemEstimate(this)">
                    <option value="">Select Story Size</option>
                    ${data.storySizes.map(size => `
                        <option value="${size}" ${existingItem && existingItem.storySize === size ? 'selected' : ''}>
                            ${size}
                        </option>
                    `).join('')}
                </select>
                <select class="complexity-select" onchange="app.updateLineItemEstimate(this)">
                    <option value="">Select Complexity</option>
                    ${data.complexitySizes.map(complexity => `
                        <option value="${complexity}" ${existingItem && existingItem.complexity === complexity ? 'selected' : ''}>
                            ${complexity}
                        </option>
                    `).join('')}
                </select>
                <input type="number" class="multiplier-input" placeholder="Multiplier" value="${existingItem ? existingItem.multiplier : 1}"
                       step="0.1" min="0.1" onchange="app.updateLineItemEstimate(this)">
                <input type="number" class="override-input" placeholder="Override Hours" value="${existingItem ? existingItem.overrideHours || '' : ''}"
                       step="0.5" min="0" onchange="app.updateLineItemEstimate(this)">
                <div class="estimated-time">0 hours</div>
            </div>
            <input type="text" placeholder="Description" value="${existingItem ? existingItem.description || '' : ''}">
        `;

        container.appendChild(div);

        if (existingItem) {
            this.updateLineItemEstimate(div.querySelector('.category-select'));
        }
    }

    removeLineItem(button) {
        button.closest('.line-item').remove();
        this.updateProjectTotal();

        document.querySelectorAll('.line-item').forEach((item, index) => {
            item.querySelector('.line-item-header strong').textContent = `Line Item ${index + 1}`;
        });
    }

    updateLineItemEstimate(element) {
        const lineItem = element.closest('.line-item');
        const categoryId = lineItem.querySelector('.category-select').value;
        const storySize = lineItem.querySelector('.size-select').value;
        const complexity = lineItem.querySelector('.complexity-select').value;
        const multiplier = parseFloat(lineItem.querySelector('.multiplier-input').value) || 1;
        const overrideHours = parseFloat(lineItem.querySelector('.override-input').value);
        const estimatedTimeEl = lineItem.querySelector('.estimated-time');

        if (!categoryId || !storySize || !complexity) {
            estimatedTimeEl.textContent = '0 hours';
            this.updateProjectTotal();
            return;
        }

        if (!isNaN(overrideHours) && overrideHours >= 0) {
            estimatedTimeEl.textContent = `${overrideHours} hours`;
            this.updateProjectTotal();
            return;
        }

        const data = this.getData();
        const category = data.categories[categoryId];

        if (category) {
            const baseHours = category.steps.reduce((sum, step) => {
                return sum + (step.estimates[storySize][complexity] || 0);
            }, 0);
            const finalHours = baseHours * multiplier;
            estimatedTimeEl.textContent = `${finalHours.toFixed(1)} hours`;
        }

        this.updateProjectTotal();
    }

    updateProjectTotal() {
        const lineItems = document.querySelectorAll('.line-item');
        let total = 0;

        lineItems.forEach(item => {
            const estimatedTimeText = item.querySelector('.estimated-time').textContent;
            const hours = parseFloat(estimatedTimeText.replace(' hours', '')) || 0;
            total += hours;
        });

        document.getElementById('total-estimate').textContent = total.toFixed(1);
    }

    saveProject() {
        const name = document.getElementById('project-name').value.trim();
        if (!name) {
            alert('Please enter a project name');
            return;
        }

        const lineItems = [];
        document.querySelectorAll('.line-item').forEach(item => {
            const categoryId = item.querySelector('.category-select').value;
            const storySize = item.querySelector('.size-select').value;
            const complexity = item.querySelector('.complexity-select').value;
            const multiplier = parseFloat(item.querySelector('.multiplier-input').value) || 1;
            const overrideHours = parseFloat(item.querySelector('.override-input').value);
            const description = item.querySelector('input[type="text"]').value.trim();
            const estimatedHours = parseFloat(item.querySelector('.estimated-time').textContent.replace(' hours', '')) || 0;

            if (categoryId && storySize && complexity) {
                lineItems.push({
                    categoryId,
                    storySize,
                    complexity,
                    multiplier,
                    overrideHours: !isNaN(overrideHours) ? overrideHours : null,
                    description,
                    estimatedHours
                });
            }
        });

        if (lineItems.length === 0) {
            alert('Please add at least one line item with category, story size, and complexity');
            return;
        }

        const data = this.getData();
        const id = this.currentProjectId || 'p' + Date.now();
        const totalHours = lineItems.reduce((sum, item) => sum + item.estimatedHours, 0);

        data.projects[id] = {
            id,
            name,
            lineItems,
            totalHours: parseFloat(totalHours.toFixed(1)),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.saveData(data);
        this.cancelProject();
        this.renderProjects();
        this.populateProjectSelector();
    }

    cancelProject() {
        document.getElementById('project-form').classList.add('hidden');
    }

    populateProjectSelector() {
        const data = this.getData();
        const selector = document.getElementById('project-selector');
        selector.innerHTML = '<option value="">Select a project</option>';

        Object.values(data.projects).forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.name;
            selector.appendChild(option);
        });
    }

    loadProjectPlan() {
        const projectId = document.getElementById('project-selector').value;
        const content = document.getElementById('project-plan-content');

        if (!projectId) {
            content.innerHTML = '';
            return;
        }

        const data = this.getData();
        const project = data.projects[projectId];

        content.innerHTML = `
            <h3>${project.name}</h3>
            <p><strong>Total Estimate:</strong> ${project.totalHours} hours</p>
            <div style="margin-top: 2rem;">
                ${project.lineItems.map((item, index) => `
                    <div class="project-plan-item">
                        <div class="plan-item-header">
                            <h4>Task ${index + 1}: ${item.description || 'Untitled Task'}</h4>
                            <span>${item.estimatedHours} hours</span>
                        </div>
                        <div class="resource-assignment">
                            <label>Assigned to:</label>
                            <select onchange="app.updateResourceAssignment('${projectId}', ${index}, this.value)">
                                <option value="">Select Resource</option>
                                ${data.resources.map(resource => `
                                    <option value="${resource.id}" ${item.assignedTo === resource.id ? 'selected' : ''}>
                                        ${resource.name} (${resource.type === 'ai' ? 'AI' : 'Human'})
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        <div style="margin-top: 0.5rem; color: #7f8c8d;">
                            Category: ${data.categories[item.categoryId]?.name || 'Unknown'} | Size: ${item.storySize || 'Unknown'} | Complexity: ${item.complexity || 'Unknown'}
                            ${item.multiplier !== 1 ? ` | Multiplier: ${item.multiplier}` : ''}
                            ${item.overrideHours ? ' | Override Applied' : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    updateResourceAssignment(projectId, lineItemIndex, resourceId) {
        const data = this.getData();
        if (!data.projects[projectId].lineItems[lineItemIndex].assignedTo) {
            data.projects[projectId].lineItems[lineItemIndex].assignedTo = resourceId;
        } else {
            data.projects[projectId].lineItems[lineItemIndex].assignedTo = resourceId;
        }
        this.saveData(data);
    }
}

const app = new EstimationTool();

function login(userType) { app.login(userType); }
function logout() { app.logout(); }
function showTab(tabName) { app.showTab(tabName); }
function addCategory() { app.addCategory(); }
function editCategory(id) { app.editCategory(id); }
function deleteCategory(id) { app.deleteCategory(id); }
function addStep(name, complexity) { app.addStep(name, complexity); }
function saveCategory() { app.saveCategory(); }
function closeModal() { app.closeModal(); }
function createProject() { app.createProject(); }
function editProject(id) { app.editProject(id); }
function deleteProject(id) { app.deleteProject(id); }
function addLineItem(item) { app.addLineItem(item); }
function removeLineItem(button) { app.removeLineItem(button); }
function updateLineItemEstimate(element) { app.updateLineItemEstimate(element); }
function saveProject() { app.saveProject(); }
function cancelProject() { app.cancelProject(); }
function loadProjectPlan() { app.loadProjectPlan(); }