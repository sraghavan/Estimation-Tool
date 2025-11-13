class EstimationTool {
    constructor() {
        this.currentUser = null;
        this.currentStoryTypeId = null;
        this.currentProjectId = null;
        this.initializeData();
        this.bindEvents();
    }

    initializeData() {
        if (!localStorage.getItem('estimationTool')) {
            const initialData = {
                storyTypes: {
                    'st1': {
                        id: 'st1',
                        name: 'Feature Development',
                        subtasks: [
                            { name: 'Analysis', hours: 2 },
                            { name: 'Design', hours: 4 },
                            { name: 'Development', hours: 8 },
                            { name: 'Testing', hours: 4 },
                            { name: 'Code Review', hours: 2 }
                        ]
                    },
                    'st2': {
                        id: 'st2',
                        name: 'Bug Fix',
                        subtasks: [
                            { name: 'Investigation', hours: 1 },
                            { name: 'Fix Implementation', hours: 2 },
                            { name: 'Testing', hours: 1 },
                            { name: 'Code Review', hours: 0.5 }
                        ]
                    },
                    'st3': {
                        id: 'st3',
                        name: 'Integration',
                        subtasks: [
                            { name: 'API Design', hours: 3 },
                            { name: 'Implementation', hours: 6 },
                            { name: 'Testing', hours: 4 },
                            { name: 'Documentation', hours: 2 }
                        ]
                    }
                },
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
            this.renderStoryTypes();
        });
    }

    login(userType) {
        this.currentUser = userType;
        document.getElementById('current-user').textContent = userType.charAt(0).toUpperCase() + userType.slice(1);
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('main-screen').classList.add('active');
        this.renderStoryTypes();
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
            this.renderStoryTypes();
        } else if (tabName === 'projects') {
            this.renderProjects();
        } else if (tabName === 'project-plan') {
            this.populateProjectSelector();
        }
    }

    renderStoryTypes() {
        const data = this.getData();
        const container = document.getElementById('story-types-container');
        container.innerHTML = '';

        Object.values(data.storyTypes).forEach(storyType => {
            const storyTypeElement = this.createStoryTypeElement(storyType);
            container.appendChild(storyTypeElement);
        });

        if (this.currentUser !== 'admin') {
            document.querySelector('.section-header .add-btn').style.display = 'none';
        }
    }

    createStoryTypeElement(storyType) {
        const div = document.createElement('div');
        div.className = 'story-type-card';

        const totalHours = storyType.subtasks.reduce((sum, task) => sum + task.hours, 0);

        div.innerHTML = `
            <div class="story-type-header">
                <h3>${storyType.name}</h3>
                <div class="story-actions">
                    ${this.currentUser === 'admin' ? `
                        <button class="edit-btn" onclick="app.editStoryType('${storyType.id}')">Edit</button>
                        <button class="delete-btn" onclick="app.deleteStoryType('${storyType.id}')">Delete</button>
                    ` : ''}
                </div>
            </div>
            <div class="subtasks-list">
                ${storyType.subtasks.map(subtask => `
                    <div class="subtask-item">
                        <div class="subtask-name">${subtask.name}</div>
                        <div class="subtask-time">${subtask.hours} hours</div>
                    </div>
                `).join('')}
            </div>
            <div style="margin-top: 1rem; font-weight: bold; color: #27ae60;">
                Total: ${totalHours} hours
            </div>
        `;

        return div;
    }

    addStoryType() {
        if (this.currentUser !== 'admin') {
            alert('Only admins can add story types');
            return;
        }
        this.currentStoryTypeId = null;
        document.getElementById('modal-title').textContent = 'Add Story Type';
        document.getElementById('story-type-name').value = '';
        document.getElementById('subtasks-container').innerHTML = '';
        this.addSubtask();
        document.getElementById('story-type-modal').classList.remove('hidden');
    }

    editStoryType(id) {
        if (this.currentUser !== 'admin') {
            alert('Only admins can edit story types');
            return;
        }

        const data = this.getData();
        const storyType = data.storyTypes[id];

        this.currentStoryTypeId = id;
        document.getElementById('modal-title').textContent = 'Edit Story Type';
        document.getElementById('story-type-name').value = storyType.name;

        const container = document.getElementById('subtasks-container');
        container.innerHTML = '';

        storyType.subtasks.forEach(subtask => {
            this.addSubtask(subtask.name, subtask.hours);
        });

        document.getElementById('story-type-modal').classList.remove('hidden');
    }

    deleteStoryType(id) {
        if (this.currentUser !== 'admin') {
            alert('Only admins can delete story types');
            return;
        }

        if (confirm('Are you sure you want to delete this story type?')) {
            const data = this.getData();
            delete data.storyTypes[id];
            this.saveData(data);
            this.renderStoryTypes();
        }
    }

    addSubtask(name = '', hours = '') {
        const container = document.getElementById('subtasks-container');
        const div = document.createElement('div');
        div.className = 'subtask-form';

        div.innerHTML = `
            <input type="text" placeholder="Subtask name" value="${name}" required>
            <input type="number" placeholder="Hours" value="${hours}" step="0.5" min="0" required>
            <button type="button" class="remove-subtask-btn" onclick="this.parentElement.remove()">Remove</button>
        `;

        container.appendChild(div);
    }

    saveStoryType() {
        const name = document.getElementById('story-type-name').value.trim();
        if (!name) {
            alert('Please enter a story type name');
            return;
        }

        const subtaskForms = document.querySelectorAll('.subtask-form');
        const subtasks = [];

        for (let form of subtaskForms) {
            const inputs = form.querySelectorAll('input');
            const taskName = inputs[0].value.trim();
            const hours = parseFloat(inputs[1].value);

            if (!taskName || isNaN(hours) || hours < 0) {
                alert('Please fill all subtask fields with valid values');
                return;
            }

            subtasks.push({ name: taskName, hours });
        }

        if (subtasks.length === 0) {
            alert('Please add at least one subtask');
            return;
        }

        const data = this.getData();
        const id = this.currentStoryTypeId || 'st' + Date.now();

        data.storyTypes[id] = {
            id,
            name,
            subtasks
        };

        this.saveData(data);
        this.closeModal();
        this.renderStoryTypes();
    }

    closeModal() {
        document.getElementById('story-type-modal').classList.add('hidden');
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
                <select class="story-type-select" onchange="app.updateLineItemEstimate(this)">
                    <option value="">Select Story Type</option>
                    ${Object.values(data.storyTypes).map(st => `
                        <option value="${st.id}" ${existingItem && existingItem.storyTypeId === st.id ? 'selected' : ''}>
                            ${st.name}
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
            this.updateLineItemEstimate(div.querySelector('.story-type-select'));
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
        const storyTypeId = lineItem.querySelector('.story-type-select').value;
        const multiplier = parseFloat(lineItem.querySelector('.multiplier-input').value) || 1;
        const overrideHours = parseFloat(lineItem.querySelector('.override-input').value);
        const estimatedTimeEl = lineItem.querySelector('.estimated-time');

        if (!storyTypeId) {
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
        const storyType = data.storyTypes[storyTypeId];

        if (storyType) {
            const baseHours = storyType.subtasks.reduce((sum, task) => sum + task.hours, 0);
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
            const storyTypeId = item.querySelector('.story-type-select').value;
            const multiplier = parseFloat(item.querySelector('.multiplier-input').value) || 1;
            const overrideHours = parseFloat(item.querySelector('.override-input').value);
            const description = item.querySelector('input[type="text"]').value.trim();
            const estimatedHours = parseFloat(item.querySelector('.estimated-time').textContent.replace(' hours', '')) || 0;

            if (storyTypeId) {
                lineItems.push({
                    storyTypeId,
                    multiplier,
                    overrideHours: !isNaN(overrideHours) ? overrideHours : null,
                    description,
                    estimatedHours
                });
            }
        });

        if (lineItems.length === 0) {
            alert('Please add at least one line item with a story type');
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
                            Story Type: ${data.storyTypes[item.storyTypeId]?.name || 'Unknown'}
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
function addStoryType() { app.addStoryType(); }
function editStoryType(id) { app.editStoryType(id); }
function deleteStoryType(id) { app.deleteStoryType(id); }
function addSubtask(name, hours) { app.addSubtask(name, hours); }
function saveStoryType() { app.saveStoryType(); }
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