class GitCommand {
	constructor(working_directory) {
		this.working_directory = working_directory;
	}
	//Command: git init
	init() {
		this.staging = [];
		this.local_repository = [];
		return "Initialized as empty Git repository.";
	}

	//Command: git status
	status() {
		let changes = `You have ${
			Object.keys(this.working_directory.new_changes).length
		} change/s.\n`;
		let length = Object.keys(this.working_directory.new_changes).length;
		let counter = 1;
		Object.keys(this.working_directory.new_changes).forEach(function (key) {
			changes += `${key}`;
			if (counter != length) {
				changes += `\n`;
			}
			counter++;
		});
		return changes;
	}

	//Command: git add <filename/file directory/wildcard>
	add(path_file) {
		let modified_files = this.working_directory.new_changes;
		let file = {};
		if (modified_files[path_file]) {
			this.staging.push(modified_files[path_file]);
			delete modified_files[path_file];
		} else if (path_file == ".") {
				this.working_directory.new_changes = {};
				return "Successfully added as index file/s.";
		} 
    else if (path_file == "*") {
			let length = Object.keys(this.working_directory.new_changes).length;
			let counter = 1;
			Object.keys(this.working_directory.new_changes).forEach(function (
				key
			) {
				if (counter == length) {
					file[key] = modified_files[key];
				}
				counter++;
			});
			this.working_directory.new_changes = file;
			return "Successfully added as index file/s.";
		} else {
			return `Failed to add ${path_file}! File is not modified or missing.`;
		}
		return "Successfully added as index file/s.";
	}

	//Command: git commit -m "<message>"
	commit(message) {
		if (this.staging.length > 0) {
			this.local_repository.push({
				message: message,
				files: this.staging,
			});
			this.staging = [];
			return "Done committing to local repository.";
		}
		return "Nothing to commit.";
	}
	//Command: git push
	push() {
		if (this.local_repository.length > 0) {
			return "Done pushing to remote repository.";
		} else {
			return "Nothing to push. No committed file found.";
		}
	}
}


module.exports = GitCommand;