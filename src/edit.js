import React, { useState } from "react";
import { __ } from "@wordpress/i18n";
import { TextControl, PanelRow, Button, Icon } from "@wordpress/components";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";
import { useSelect } from "@wordpress/data";
import { useEntityProp } from "@wordpress/core-data";
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {
	const postType = useSelect((select) => select("core/editor").getCurrentPostType(), []);
	const [meta, setMeta] = useEntityProp("postType", postType, "meta");

	const metaTheatre = meta["theatre_occupancy"] ?? "";
	const updateTheatre = (newValue) => {
		setMeta({ ...meta, theatre_occupancy: newValue });
	};

	const metaBoardroom = meta["boardroom_occupancy"] ?? "";
	const updateBoardroom = (newValue) => {
		setMeta({ ...meta, boardroom_occupancy: newValue });
	};

	const metaInduction = meta["induction_occupancy"] ?? "";
	const updateInduction = (newValue) => {
		setMeta({ ...meta, induction_occupancy: newValue });
	};

	const metaClassroom = meta["classroom_occupancy"] ?? "";
	const updateClassroom = (newValue) => {
		setMeta({ ...meta, classroom_occupancy: newValue });
	};

	const metaBanquet = meta["banquet_occupancy"] ?? "";
	const updateBanquet = (newValue) => {
		setMeta({ ...meta, banquet_occupancy: newValue });
	};

	const metaCabaret6ft = meta["cabaret_6ft_occupancy"] ?? "";
	const updateCabaret6ft = (newValue) => {
		setMeta({ ...meta, cabaret_6ft_occupancy: newValue });
	};

	const metaCabaret4ft = meta["cabaret_4ft_occupancy"] ?? "";
	const updateCabaret4ft = (newValue) => {
		setMeta({ ...meta, cabaret_4ft_occupancy: newValue });
	};

	const [metaAudio, setMetaAudio] = useState(
		meta["audio_equipment"].map((item) => {
			if (typeof item === "object") {
				return item.join(" ");
			} else {
				return item;
			}
		})
	);
	const updateAudio = (newValue, index) => {
		const newAudio = [...metaAudio];
		newAudio[index] = newValue;
		setMetaAudio(newAudio);
		setMeta({ ...meta, audio_equipment: newAudio });
	};
	const addAudio = () => {
		const newAudio = [...metaAudio];
		newAudio.push("");
		setMetaAudio(newAudio);
	};
	const removeAudio = (index) => {
		const newAudio = [...metaAudio];
		newAudio.splice(index, 1);
		setMetaAudio(newAudio);
		setMeta({ ...meta, audio_equipment: newAudio });
	};

	const [metaPresentation, setMetaPresentation] = useState(
		meta["presentation_equipment"].map((item) => {
			if (typeof item === "object") {
				return item.join(" ");
			} else {
				return item;
			}
		})
	);
	const updatePresentation = (newValue, index) => {
		const newPresentation = [...metaPresentation];
		newPresentation[index] = newValue;
		setMetaPresentation(newPresentation);
		setMeta({ ...meta, presentation_equipment: newPresentation });
	};
	const addPresentation = () => {
		const newPresentation = [...metaPresentation];
		newPresentation.push("");
		setMetaPresentation(newPresentation);
	};
	const removePresentation = (index) => {
		const newPresentation = [...metaPresentation];
		newPresentation.splice(index, 1);
		setMetaPresentation(newPresentation);
		setMeta({ ...meta, presentation_equipment: newPresentation });
	};

	return (
		<PluginDocumentSettingPanel title={__("Room Meta", "room-post-type")} initialOpen={true}>
			<PanelRow>
				<TextControl label="Theatre Occupancy" value={metaTheatre} onChange={updateTheatre} />
			</PanelRow>
			<PanelRow>
				<TextControl label="Boardroom Occupancy" value={metaBoardroom} onChange={updateBoardroom} />
			</PanelRow>
			<PanelRow>
				<TextControl label="Induction Occupancy" value={metaInduction} onChange={updateInduction} />
			</PanelRow>
			<PanelRow>
				<TextControl label="Classroom Occupancy" value={metaClassroom} onChange={updateClassroom} />
			</PanelRow>
			<PanelRow>
				<TextControl label="Banquet Occupancy" value={metaBanquet} onChange={updateBanquet} />
			</PanelRow>
			<PanelRow>
				<TextControl label="Cabaret 6ft Occupancy" value={metaCabaret6ft} onChange={updateCabaret6ft} />
			</PanelRow>
			<PanelRow>
				<TextControl label="Cabaret 4ft Occupancy" value={metaCabaret4ft} onChange={updateCabaret4ft} />
			</PanelRow>
			<PanelRow>
				<label>AUDIO EQUIPMENT</label>
			</PanelRow>
			<PanelRow>
				<Button onClick={addAudio} isPrimary>
					Add audio equipment
				</Button>
			</PanelRow>
			{metaAudio.map((audio, index) => (
				<PanelRow key={index}>
					<TextControl value={audio} onChange={(e) => updateAudio(e, index)} />
					<Button onClick={(e) => removeAudio(index)} isDestructive>
						<Icon icon="no" />
					</Button>
				</PanelRow>
			))}
			<PanelRow>
				<label>PRESENTATION EQUIPMENT</label>
			</PanelRow>
			<PanelRow>
				<Button onClick={addPresentation} isPrimary>
					Add presentation equipment
				</Button>
			</PanelRow>
			{metaPresentation.map((presentation, index) => (
				<PanelRow key={index}>
					<TextControl value={presentation} onChange={(e) => updatePresentation(e, index)} />
					<Button onClick={(e) => removePresentation(index)} isDestructive>
						<Icon icon="no" />
					</Button>
				</PanelRow>
			))}
		</PluginDocumentSettingPanel>
	);
}
