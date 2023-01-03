<script lang="ts">
	import { enhance } from "$app/forms";
	import type ApiTypes from "$lib/ApiTypes";
	import { TextEditorActions } from "$lib/Types";
	export let actionName: TextEditorActions;
	export let article: ApiTypes.operations["CreateArticle"]["requestBody"]["content"]["application/json"]["article"] =
		{
			title: "",
			description: "",
			body: "",
			tagList: [""]
		};
	import { page } from "$app/stores";

	const actionPath =
		actionName === TextEditorActions.update
			? `/write/${$page.params.slug}?/${actionName}`
			: `/write?/{actionName}`;
</script>

<div class="editor-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-10 offset-md-1 col-xs-12">
				<form method="POST" use:enhance action={actionPath}>
					<fieldset>
						<fieldset class="form-group">
							<input
								type="text"
								class="form-control form-control-lg"
								placeholder="Article Title"
								name="title"
								bind:value={article.title}
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								type="text"
								class="form-control"
								placeholder="What's this article about?"
								name="description"
								bind:value={article.description}
							/>
						</fieldset>
						<fieldset class="form-group">
							<textarea
								class="form-control"
								rows="8"
								placeholder="Write your article (in markdown)"
								name="body"
								bind:value={article.body}
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								type="text"
								class="form-control"
								placeholder="Enter tags"
								name="tagList"
								value={article.tagList?.join(" ")}
							/>
							<div class="tag-list" />
						</fieldset>
						<button class="btn btn-lg pull-xs-right btn-primary" type="submit">
							Publish Article
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</div>
