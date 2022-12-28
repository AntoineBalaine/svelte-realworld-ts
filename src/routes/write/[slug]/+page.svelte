<script lang="ts">
	import TextEditor from "$Components/TextEditor.svelte";
	import { TextEditorActions } from "$lib/Types";
	import type { PageData } from "./$types";
	export let data: PageData;
	const { article } = data;
</script>

<TextEditor actionName={TextEditorActions.update} {article} />
