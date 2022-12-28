<script lang="ts">
	import TextEditor from "$Components/TextEditor.svelte";
	import { TextEditorActions } from "$lib/Types";
</script>

<TextEditor actionName={TextEditorActions.create} />
